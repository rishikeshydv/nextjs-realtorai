import pool from "@/prisma/pool";
import { NextResponse } from "next/server";

interface PropertyDetails{
    zp_id: string;
    zip: string;
    address: string;
    image: string;
    price: string;
    beds: number;
    baths: number;
    sqft: number;
    year_built: number;
    property_type: string;
}

interface ReturnPropertyDetails{
    zp_id: string;
    details: PropertyDetails;
    qualify: boolean
}
export async function POST(req: Request):Promise<NextResponse> {
    const reqBody = await req.json();
    const { queryField, queryValue, priceRange, beds, baths, propertyType, sqftRange, yearBuiltRange } = reqBody;
    console.log(propertyType)
    //return properties
    const res: ReturnPropertyDetails[] = [];
  //get all zp_ids
  console.log(queryField, queryValue)
  const allPropertyRows = await pool.query(
    `SELECT zp_id, street, city, state, zip FROM initial_data_for_sale WHERE LOWER(TRIM(${queryField})) = $1`,
    [queryValue]
  );


  console.log(allPropertyRows.rowCount)
  allPropertyRows.rows.forEach((row: { zp_id: string; street: string; city: string; state: string; zip: string }) => {
    res.push({
        zp_id: row.zp_id,
        details: {
            zp_id: row.zp_id,
            zip: row.zip,
            address: `${row.street}, ${row.city}, ${row.state}`,
            image: "", // Placeholder for image
            price: "", // Placeholder for price
            beds: 0, // Placeholder for beds
            baths: 0, // Placeholder for baths
            sqft: 0, // Placeholder for sqft
            year_built: 0, // Placeholder for year built
            property_type: "n/a", // Placeholder for property type
        },
        qualify: true
    });
  });


  if (allPropertyRows.rowCount !== null && allPropertyRows.rowCount > 0) {
    const propertyIds: string[] = allPropertyRows.rows.map((row: { zp_id: string }) => row.zp_id);
    const propertyIdsString = propertyIds.map((id) => `'${id}'`).join(",");

        //now we get full_market_value from assessment_information and that would be the price
        //we make sure the price is between the min and max price
        const price = await pool.query(
            `SELECT zp_id,price FROM deep_scrape WHERE zp_id IN (${propertyIdsString})`
        );
        price.rows.forEach((row: { zp_id: string; price: string }) => {
            const property = res.find((p) => p.zp_id === row.zp_id);
            if (property) {
                //check if price is between min and max
                const marketValue = Number( row.price.slice(1, row.price.length).replace(/,/g, ""));
                if (!isNaN(marketValue)) {
                if (marketValue < priceRange.min || marketValue > priceRange.max) {
                    property.qualify = false;
                }
                }
                property.details.price = "$"+ marketValue.toLocaleString("en-US");
            }
        }
        );

        //now we get bedrooms,full_baths,year_built from building_information_left
        const bedrooms = await pool.query(
            `SELECT zp_id,bedrooms,full_baths,year_built FROM building_information_left WHERE zp_id IN (${propertyIdsString})`
        );
        bedrooms.rows.forEach((row: { zp_id: string; bedrooms: string; full_baths: string; year_built: string }) => {
            const property = res.find((p) => p.zp_id === row.zp_id);
            if (property) {
                const bedrooms = Number(row.bedrooms);
                const full_baths = Number(row.full_baths);
                const yearBuilt = Number(row.year_built);
                if (!isNaN(bedrooms) && !isNaN(full_baths) && !isNaN(yearBuilt)) {
                    if (Number(beds) > Number(bedrooms) || Number(baths) > Number(full_baths) || yearBuilt < yearBuiltRange.min || yearBuilt > yearBuiltRange.max) {
                        property.qualify = false;
                    }
                    property.details.beds = bedrooms;
                    property.details.baths = full_baths;
                    property.details.year_built = yearBuilt;
                }
            }
        }
        );
        //now we get sqft from land_information
        const sqft = await pool.query(
            `SELECT zp_id,total_sqft FROM building_information_right WHERE zp_id IN (${propertyIdsString})`
        );
        sqft.rows.forEach((row: { zp_id: string; total_sqft: string }) => {
            const property = res.find((p) => p.zp_id === row.zp_id);
            if (property) {
                const sqft = Number(row.total_sqft.replace(",", ""));
                if (!isNaN(sqft)) {
                    if (sqft < sqftRange.min || sqft > sqftRange.max) {
                        property.qualify = false;
                    }
                    property.details.sqft = sqft;
                }
            }
        }
        );

        //for each property's zp_ids, we get the image from table ownership_info
        const image = await pool.query(
            `SELECT zp_id,img_url FROM ownership_info WHERE zp_id IN (${propertyIdsString})`
        );
        //only push images, if the property qualifies
        image.rows.forEach((row: { zp_id: string; img_url: string }) => {
            const property = res.find((p) => p.zp_id === row.zp_id);
            if (property && property.qualify) {
                property.details.image = row.img_url;
            }
        }
        );

  }
        //filter out properties that do not qualify
        //also make sure, if all the details are filled
        const filteredProperties = res.filter((property) => {
            return property.qualify && property.details.image !== "" && property.details.price !== "" && property.details.beds !== 0 && property.details.baths !== 0 && property.details.sqft !== 0 && property.details.year_built !== 0 && property.details.property_type !== "";
        });
        //return the filtered properties
        return NextResponse.json({ properties: filteredProperties });
}
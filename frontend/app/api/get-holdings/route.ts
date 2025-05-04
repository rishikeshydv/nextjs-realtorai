import pool from "@/prisma/pool";
import { NextResponse } from "next/server";

interface PropertyDetails {
  zp_id: string;
  zip : string;
  address: string;
  image: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  year_built: number;
  property_type: string;
}

interface ReturnPropertyDetails {
  zp_id: string;
  details: PropertyDetails;
  qualify: boolean;
}
export async function POST(req: Request): Promise<NextResponse> {
  const reqBody = await req.json();
  const {userEmail } = reqBody;

  //return properties
  const res: ReturnPropertyDetails[] = [];

  //get all properties holdings for the user
  const holdings = await pool.query(
    `SELECT zp_id FROM property_holdings WHERE email = $1`,
    [userEmail]
  );

  if (holdings.rowCount !== null && holdings.rowCount > 0) {
    holdings.rows.forEach((row) => {
      res.push({
        zp_id: row.zp_id,
        details: {
          zp_id: row.zp_id,
          zip: "", // Placeholder for zip
          address: "",
          image: "", // Placeholder for image
          price: "", // Placeholder for price
          beds: 0, // Placeholder for beds
          baths: 0, // Placeholder for baths
          sqft: 0, // Placeholder for sqft
          year_built: 0, // Placeholder for year built
          property_type: "n/a", // Placeholder for property type
        },
        qualify: true,
      });
    });

    //make a zpid string
    const propertyIds = holdings.rows.map((row) => row.zp_id);
    const propertyIdsString = propertyIds.map((id) => `'${id}'`).join(",");

      //get all properties holdings
  const allPropertyRows = await pool.query(
    `SELECT zp_id, street, city, state, zip FROM initial_data_for_sale WHERE zp_id IN (${propertyIdsString})`
  );

  if (allPropertyRows.rowCount !== null && allPropertyRows.rowCount > 0) {
    //get the address
    allPropertyRows.rows.forEach((row) => {
      const property = res.find((p) => p.zp_id === row.zp_id);
      if (property) {
        property.details.address = `${row.street}, ${row.city}, ${row.state}`;
        property.details.zip = row.zip;
      }
    });

    //now we get full_market_value from assessment_information and that would be the price
    //we make sure the price is between the min and max price
    const price = await pool.query(
      `SELECT zp_id,price FROM deep_scrape WHERE zp_id IN (${propertyIdsString})`
    );
    price.rows.forEach((row) => {
      const property = res.find((p) => p.zp_id === row.zp_id);
      if (property) {
        property.details.price = row.price;
      }
    });

    //now we get bedrooms,full_baths,year_built from building_information_left
    const bedrooms = await pool.query(
      `SELECT zp_id,bedrooms,full_baths,year_built FROM building_information_left WHERE zp_id IN (${propertyIdsString})`
    );
    bedrooms.rows.forEach((row) => {
      const property = res.find((p) => p.zp_id === row.zp_id);
      if (property) {
        property.details.beds = row.bedrooms;
        property.details.baths = row.full_baths;
        property.details.year_built = row.year_built;
      }
    });
    //now we get sqft from land_information
    const sqft = await pool.query(
      `SELECT zp_id,total_sqft FROM building_information_right WHERE zp_id IN (${propertyIdsString})`
    );
    sqft.rows.forEach((row) => {
      const property = res.find((p) => p.zp_id === row.zp_id);
      if (property) {
        property.details.sqft = Number(row.total_sqft.replace(",", ""));
      }
    });

    //for each property's zp_ids, we get the image from table ownership_info
    const image = await pool.query(
      `SELECT zp_id,img_url FROM ownership_info WHERE zp_id IN (${propertyIdsString})`
    );
    //only push images, if the property qualifies
    image.rows.forEach((row) => {
      const property = res.find((p) => p.zp_id === row.zp_id);
      if (property) {
        property.details.image = row.img_url;
      }
    });
  }
  }



        //filter out properties that do not qualify
        //also make sure, if all the details are filled
        const filteredProperties = res.filter((property) => {
            return property.qualify && property.details.image !== "" && property.details.price !== "" && property.details.beds !== 0 && property.details.baths !== 0 && property.details.sqft !== 0 && property.details.year_built !== 0 && property.details.property_type !== "";
        });
        //return the filtered properties
        return NextResponse.json({ properties: filteredProperties });
}

import pool from "@/prisma/pool";
import { NextResponse } from "next/server";

interface PropertyDetails {
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

interface ReturnPropertyDetails {
  zp_id: string;
  details: PropertyDetails;
  qualify: boolean;
}

export async function POST(request: Request): Promise<NextResponse> {
  const { zp_id } = await request.json();

  try {
    //get beds and baths
    const property = await pool.query(
      `SELECT bedrooms, full_baths FROM building_information_left WHERE zp_id = $1`,
      [zp_id]
    );
    const beds = property.rows[0]?.bedrooms;
    const baths = property.rows[0]?.full_baths;

    if (!beds || !baths) {
      return NextResponse.json({ properties: [] });
    }

    const allPropertyRows = await pool.query(
      `
        SELECT zp_id, bedrooms, full_baths, year_built FROM building_information_left WHERE bedrooms = $1 AND full_baths = $2
        `,
      [beds, baths]
    );

    const propertyMap: Record<string, ReturnPropertyDetails> = {};

    allPropertyRows.rows.forEach((row: { zp_id: string; bedrooms: number; full_baths: number; year_built: number }) => {
      propertyMap[row.zp_id] = {
        zp_id: row.zp_id,
        details: {
          zp_id: row.zp_id,
          zip: "",
          address: "",
          image: "",
          price: "",
          beds: Number(row.bedrooms),
          baths: Number(row.full_baths),
          sqft: 0,
          year_built: Number(row.year_built),
          property_type: "n/a",
        },
        qualify: true,
      };
    });

    const propertyIds = Object.keys(propertyMap);
    const propertyIdsString = propertyIds.map((id) => `'${id}'`).join(",");

    //now we get full_market_value from assessment_information and that would be the price
    //we make sure the price is between the min and max price
    const price = await pool.query(
      `SELECT zp_id,price FROM deep_scrape WHERE zp_id IN (${propertyIdsString})`
    );

    price.rows.forEach((row: { zp_id: string; price: string }) => {
      const property = propertyMap[row.zp_id];
      if (property) {
        const marketValue = Number(row.price.slice(1).replace(/,/g, ""));
        property.details.price = "$" + marketValue.toLocaleString("en-US");
      }
    });

    //now we get street, city, state, zip from initial_data_for_sale
        const addresses = await pool.query(
        `SELECT zp_id, street, city, state, zip FROM initial_data_for_sale WHERE zp_id IN (${propertyIdsString})`
        );
        addresses.rows.forEach((row: { zp_id: string; street: string; city: string; state: string; zip: string }) => {
        const property = propertyMap[row.zp_id];
        if (property) {
            // Ensure each field is available
            if (row.street && row.city && row.state && row.zip) {
            property.details.address = `${row.street}, ${row.city}, ${row.state}`;
            property.details.zip = row.zip;
            } else {
            console.warn(`Address missing data for zp_id: ${row.zp_id}`);
            }
        }
        });

    //now we get sqft from land_information
    const sqft = await pool.query(
      `SELECT zp_id,total_sqft FROM building_information_right WHERE zp_id IN (${propertyIdsString})`
    );
    sqft.rows.forEach((row: { zp_id: string; total_sqft: string }) => {
      const property = propertyMap[row.zp_id];
      if (property) {
        const sqftValue =Number(row.total_sqft.replace(",", ""));
        if (!isNaN(sqftValue)) {
          property.details.sqft = sqftValue;
        }
      }
    });

    //for each property's zp_ids, we get the image from table ownership_info
    const image = await pool.query(
      `SELECT zp_id,img_url FROM ownership_info WHERE zp_id IN (${propertyIdsString})`
    );
    //only push images, if the property qualifies
    image.rows.forEach((row: { zp_id: string; img_url: string }) => {
      const property = propertyMap[row.zp_id];
      if (property && property.qualify) {
        property.details.image = row.img_url;
      }
    });

    const filteredProperties = Object.values(propertyMap).filter(
      (property) =>
        property.qualify &&
        property.details.image !== "" &&
        property.details.price !== "" &&
        property.details.beds !== 0 &&
        property.details.baths !== 0 &&
        property.details.sqft !== 0 &&
        property.details.year_built !== 0 &&
        property.details.property_type !== ""

    );
    return NextResponse.json({ properties: filteredProperties });
  } catch (error) {
    console.error("Error fetching similar properties:", error);
    return NextResponse.json({ properties: [] });
  }
}

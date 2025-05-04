import pool from "@/prisma/pool";
import { NextResponse } from "next/server";
import { CompareData } from "@/types/CompareData";
import { STREET_MAPPING } from "@/mappings/street_mapping";
export async function POST(request: Request): Promise<NextResponse> {
    const {main_property_id, compare_property_id} = await request.json();
    const [main_property_info, compare_property_info] = await Promise.all([
        GetPropertyInfo(main_property_id),
        GetPropertyInfo(compare_property_id),
      ]);
    return NextResponse.json({
        main_property_info: main_property_info,
        compare_property_info: compare_property_info,
    });
    

}

const GetPropertyInfo = async (property_id: string) => {
    const property_info = await pool.query(
        `SELECT oi.img_url, idfs.street, idfs.city, idfs.state, idfs.zip, bil.bedrooms, bil.full_baths, bil.year_built, bir.kitchens, li.sqft, ds.price, ds.days_on_market, mr.predicted_price, mr.sales_probability,  lv.tax_value_paid,  mv.market_values, w.walkscore,w.bikescore, th.transfer_count  FROM ownership_info as oi
        JOIN initial_data_for_sale as idfs ON oi.zp_id = idfs.zp_id
        JOIN building_information_left as bil ON oi.zp_id = bil.zp_id
        JOIN building_information_right as bir ON oi.zp_id = bir.zp_id
        JOIN land_information as li ON oi.zp_id = li.zp_id
        JOIN deep_scrape as ds ON oi.zp_id = ds.zp_id
        JOIN model_returns as mr ON oi.zp_id = mr.zp_id
        LEFT JOIN (
            SELECT zp_id, COUNT(*) AS transfer_count
            FROM transfer_history
            GROUP BY zp_id
        ) th ON oi.zp_id = th.zp_id

        LEFT JOIN LATERAL (
        SELECT tax_value_paid
        FROM valuation
        WHERE zp_id = oi.zp_id
        ORDER BY CAST(year AS INTEGER) DESC
        LIMIT 1
        ) lv ON TRUE

        LEFT JOIN LATERAL (
        SELECT array_agg(market_value ORDER BY CAST(year AS INTEGER)) AS market_values
        FROM (
            SELECT DISTINCT market_value, year
            FROM valuation
            WHERE zp_id = oi.zp_id
        ) AS distinct_vals
        ) mv ON TRUE

        JOIN walkability AS w ON oi.zp_id = w.zp_id

        WHERE oi.zp_id = $1;`,
        [property_id]
    );

    if (property_info.rows.length === 0) {
        throw new Error("Property not found");
    }

    const property = property_info.rows[0];
    //get the street name by removing the street number
    const street_number = property.street.split(" ")[0];
    const street_name = property.street.replace(street_number, "").trim();
    const retrievedCrimeScore = await getCrimeScore(street_name);
    const property_data: CompareData = {
        image_url: property.img_url,
        address: `${property.street}, ${property.city}, ${property.state} ${property.zip}`,
        physical_attributes: {
            beds: Number(property.bedrooms),
            baths: Number(property.full_baths),
            sqft: Number(property.sqft),
            kitchen: Number(property.kitchens),
            age: new Date().getFullYear() - Number(property.year_built),
        },
        financial_attributes: {
            actual_price: `${property.price}`,
            predicted_price: `$${property.predicted_price}`,
            price_per_sqft: `$${(ParsePrice(property.price) / Number(property.sqft)).toFixed(2)}`,
            price_change_in_last_5_years: `$${calculateMarketValueDifference(property.market_values)}`,
        },
        market_attributes: {
            days_on_market: property.days_on_market ? Math.floor( (Date.now() - new Date(property.days_on_market).getTime()) / (1000 * 3600 * 24)) : 0,
            sales_probability: Number(property.sales_probability),
            total_ownership_transfer: Number(property.transfer_count),
            tax_assessed: `${property.tax_value_paid}`,
        },
        location_attributes: {
            walk_score: property.walkscore,
            bike_score: property.bikescore,
            crime_score: Number(retrievedCrimeScore),
        },
    }
    return property_data;
}

function ParsePrice(input: string): number {
    // Remove dollar sign and commas, then parse to integer
    const parsedValue = parseInt(input.replace(/\$|,/g, ""));
    return isNaN(parsedValue) ? 0 : parsedValue;
}

function calculateMarketValueDifference(marketValues: string[]): number {
    // Convert market values to integers and remove any non-distinct values
    const distinctValues = Array.from(
      new Set(marketValues.map((value) => parseInt(value.replace(/\$|,/g, ""))))
    );
  
    // If there are less than 2 distinct values, return 0
    if (distinctValues.length < 2) {
      return 0;
    }
  
    // Sort the distinct values in descending order to get the most recent ones
    distinctValues.sort((a, b) => b - a);
  
    // Return the difference between the two most recent distinct values
    return distinctValues[0] - distinctValues[1];
}

function getCrimeScore(street:string): Promise<number> {
    const streetName = street.toUpperCase();
    const mappedStreet = STREET_MAPPING[streetName as keyof typeof STREET_MAPPING];
    const query = `SELECT scaled_crime_score FROM crime_score WHERE street = $1`;
    const values = [mappedStreet];
    return pool.query(query, values)
        .then((result) => {
            if (result.rows.length > 0) {
                return result.rows[0].scaled_crime_score;
            } else {
                throw new Error("Street not found in crime score table");
            }
        }
    )
        .catch((error) => {
            console.error("Error fetching crime score:", error);
            throw error;
        }
    );
}
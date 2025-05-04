import pool from "@/prisma/pool";
import { NextResponse } from "next/server";

export async function POST(request: Request):Promise<NextResponse> {
    const {zp_id} = await request.json();
    const query = `
    SELECT zp_id, property_image_url, property_address, sale_price, sale_date, distance_from_current_property, beds, baths, sqft, year_built
    FROM nearby_sales
    WHERE zp_id = $1
    `;
    const values = [zp_id];
    const res = []
    try {
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
        for (const row of rows) {
            res.push({
                image: row.property_image_url,
                address: row.property_address,
                sale_price: row.sale_price,
                sale_date: row.sale_date,
                distance: row.distance_from_current_property,
                beds: row.beds,
                baths: row.baths,
                sqft: row.sqft,
                year_built: row.year_built
            });
        }
        return NextResponse.json({ nearby_sales: res }, { status: 200 });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }
}
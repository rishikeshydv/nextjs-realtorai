import pool from "@/prisma/pool";
import { NextResponse } from "next/server";

export async function POST(request:Request):Promise<NextResponse> {
    const {zp_id} = await request.json();
    const query = `SELECT * FROM deep_scrape WHERE zp_id = $1`;
    const values = [zp_id];
    try {
        const rows = await pool.query(query, values);
        if (rows.rowCount === 0) {
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
        const data = rows.rows[0];
        return NextResponse.json({
            fire: data.fire_factor,
            flood: data.flood_factor,
            wind: data.wind_factor,
            air: data.air_factor,
            heat: data.heat_factor
        });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
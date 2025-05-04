import { NextResponse } from "next/server";
import pool from "@/prisma/pool";
export async function POST(req:Request):Promise<NextResponse> {
    const reqBody = await req.json();
    const { zip } = reqBody;
    console.log("zip gender", zip);
    const rows = await pool.query(
        `SELECT * FROM population_data WHERE zip_code = $1`,
        [zip]
    );
    if (rows.rowCount != null && rows.rowCount > 0) {
        return NextResponse.json({
            male_population:rows.rows[0].male_population,
            female_population:rows.rows[0].female_population,
            white_population:rows.rows[0].white_population,
            black_population:rows.rows[0].black_population,
            asian_population:rows.rows[0].asian_population,
            american_indian_alaska_native_population:rows.rows[0].american_indian_alaska_native_population,
            native_hawaiian_pacific_islander_population:rows.rows[0].native_hawaiian_pacific_islander_population,
            some_other_race_population:rows.rows[0].some_other_race_population
        })
    } else {
        return NextResponse.json({
            error: "No data found for the given zip code."
        })
    }
}
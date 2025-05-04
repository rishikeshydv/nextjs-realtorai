import pool from "@/prisma/pool";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { zp_id } = await request.json();

  try {
    const result = await pool.query(
      `SELECT * FROM assessment_information WHERE zp_id = $1`,
      [zp_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({
        message: "No data found for the provided zp_id",
      });
    }

    return NextResponse.json({
        total_assessed_value: result.rows[0].total_assessed_value,
        full_market_value: result.rows[0].full_market_value,
        total_land_value: result.rows[0].total_land_value,
        county_taxable_value: result.rows[0].county_taxable_value,
        town_taxable_value: result.rows[0].town_taxable_value,
        school_taxable_value: result.rows[0].school_taxable_value,
        village_taxable_value: result.rows[0].village_taxable_value,
        assessment_level: result.rows[0].assessment_level,
        equalization_rate: result.rows[0].equilization_rate,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
import pool from "@/prisma/pool";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {zp_id} = await request.json();
    const rows = await pool.query(
        `SELECT * FROM additional_improvements WHERE zp_id = $1`,
        [zp_id]
    );
    if (rows.rowCount === 0) {
        return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
    const improvements = rows.rows.map((row) => ({
        info: formatPropertyType(row.description),
        condition: formatPropertyType(row.condition),
        yearBuilt: row.year_built,
        squareFootage: row.sqft,
    }));

    return NextResponse.json({
        improvementList: improvements,
    });
}

function formatPropertyType(input: string): string {
    const parts = input.split("-");
    if (parts.length < 2) return input;

    const description = parts[1].trim().toLowerCase();
    return description
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
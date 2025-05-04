import { NextResponse } from "next/server";
import pool from "@/prisma/pool";

export async function POST(request: Request): Promise<NextResponse> {
    const reqBody = await request.json();
    const { analyzedPropertyId } = reqBody;
    console.log("ReqBody", analyzedPropertyId);

    const rows = await pool.query(
        `SELECT price FROM deep_scrape WHERE zp_id = $1`,
        [analyzedPropertyId]
    );

    if (rows.rowCount && rows.rowCount > 0) {
        return NextResponse.json({
            price: rows.rows[0].price
        });
    }

    return NextResponse.json({
        error: "No data found"
    });
}

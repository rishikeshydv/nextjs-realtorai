import { NextResponse } from "next/server";
import pool from "@/prisma/pool";
export async function POST(request: Request): Promise<NextResponse> {
    const res: { year: string[]; market_value: string[]; tax_value_paid: string[] } = {
        year: [],
        market_value: [],
        tax_value_paid: []
    }
    const reqBody = await request.json();
    const { analyzedPropertyId } = reqBody;
    const query = `
    SELECT year,market_value, tax_value_paid FROM valuation
    WHERE zp_id = $1
    `;
    const values = [analyzedPropertyId];
    try {
        const allRows = await pool.query(
            query,
            values
        )
        allRows.rows.forEach((row) => {
            res.year.push(row.year);
            res.market_value.push(row.market_value);
            res.tax_value_paid.push(row.tax_value_paid);
        })
        return NextResponse.json({
            valuation: res
        });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Error fetching data" });
    }
}
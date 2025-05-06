import pool from "@/prisma/pool";
import { NextResponse } from "next/server";

interface ValuationType {
    year: number;
    assessmentValue: number;
    marketValue: number;
    taxValuePaid: number;
    taxPaidDate: Date;
}

function ParsePrice(input:string):number{
    //remove $ and , from the string
    const parsed = input.replace(/\$|,/g, "");
    //parse the string to a number
    const parsedNumber = parseFloat(parsed);
    //check if the parsed number is a number
    if (isNaN(parsedNumber)) {
        throw new Error("Invalid price format");
    }
    return parsedNumber;
}

  

export async function POST(request:Request){
    const { zp_id } = await request.json();
    const query = `
        SELECT * FROM valuation WHERE zp_id = $1
    `;
    const values = [zp_id];
    try {
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
        const valuationHistory:ValuationType[] = []
        rows.forEach((row:{
            year: string;
            assessment_value: string;
            market_value: string;
            tax_value_paid: string;
            tax_paid_date: string;
        }) => {
            valuationHistory.push({
                year: ParsePrice(row.year),
                assessmentValue: ParsePrice(row.assessment_value),
                marketValue: ParsePrice(row.market_value),
                taxValuePaid: ParsePrice(row.tax_value_paid),
                taxPaidDate: new Date(row.tax_paid_date)
            });
        });
        return NextResponse.json({
            valuationHistory: valuationHistory,
        });
    }
    catch (error) {
        console.error("Error fetching valuation data:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
import pool from "@/prisma/pool";
import { NextResponse } from "next/server";

interface ReturnType {
    zp_id: string;
    predicted_price: string;
    sales_probability: string;
    roi: string;
    arv: string;
    mortgage: string;
}

const priceFormatter = (value: string): string => {
    const num = parseFloat(value.replace(/[^0-9.-]+/g, "")); // remove $ , etc.
    
    if (isNaN(num)) return "$0";
  
    if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    } else if (num >= 1_000) {
      return `$${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
    } else {
      return `$${Math.floor(num)}`;
    }
  };
  

export async function POST(request: Request): Promise<NextResponse> {
    const {zp_id} = await request.json();
    const query = `
    SELECT 
      mr.zp_id,
      mr.predicted_price,
      mr.sales_probability,
      re.roi,
      re.arv,
      re.monthly_payment
    FROM model_returns mr
    LEFT JOIN roi_estimations re ON mr.zp_id = re.zp_id
    WHERE mr.zp_id = $1;
  `;


  try {
    const result = await pool.query(query, [zp_id]);
    if (result.rows.length === 0) {
      console.log("No data found for the given zp_id");
      return NextResponse.json({"data":[]});
    }
    interface QueryResultRow {
        zp_id: string;
        predicted_price: string;
        sales_probability: string;
        roi: string;
        arv: string;
        monthly_payment: string;
    }
    
    const formatted: ReturnType[] = result.rows.map((row: QueryResultRow) => ({
      zp_id: row.zp_id,
      predicted_price: priceFormatter(row.predicted_price),
      sales_probability: row.sales_probability,
      roi: priceFormatter(row.roi),
      arv: priceFormatter(row.arv),
      mortgage: priceFormatter(row.monthly_payment),
    }));
    return NextResponse.json({"data":formatted});
  } catch (error) {
    console.error("Error fetching property data:", error);
    throw error;
  }

}
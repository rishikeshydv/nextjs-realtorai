import { NextResponse } from "next/server";
import pool from "@/prisma/pool";
export async function POST(req:Request){
    const {zp_id} = await req.json();
    const rows = await pool.query(
        `SELECT * FROM initial_data_for_sale WHERE zp_id = $1`,
        [zp_id]
    );
    if (rows.rowCount!= null && rows.rowCount >0){
        return NextResponse.json({
            address: rows.rows[0].street + ", " + rows.rows[0].city + ", " + rows.rows[0].state + ", " + rows.rows[0].zip,
        })
    }
    return NextResponse.json({
        address: "Address not found",
    })
}
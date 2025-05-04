import { NextResponse } from "next/server";
import pool from "@/prisma/pool";
export async function POST(req:Request){
    const reqBody = await req.json();
    const {zp_id} = reqBody;
    const query = `SELECT * FROM walkability WHERE zp_id = $1`;
    const values = [zp_id];
    try {
        const rows = await pool.query(query, values);
        if (rows.rowCount!= null && rows.rowCount > 0) {
            const data = rows.rows[0];
            return NextResponse.json({
                walkscore: data.walkscore,
                bikescore: data.bikescore,
            });
        }
        return NextResponse.json({success: false, message: "No data found"});
    } catch (error) {
        console.error("Error fetching walkability data:", error);
        return NextResponse.json({success: false, message: "Error fetching data"});
    }
}
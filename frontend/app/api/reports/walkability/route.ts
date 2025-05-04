import pool from "@/prisma/pool";
import { NextResponse } from "next/server";
export async function POST(request:Request){
const {zp_id} = await request.json();
const query = `SELECT * FROM walkability WHERE zp_id = $1`;
const walkability = await pool.query(query, [zp_id]);
if (walkability.rowCount === 0) {
    return NextResponse.json({message:"No data found"}, {status: 404});
}
return NextResponse.json({
    walkScore: walkability.rows[0].walkscore,
    transitScore: walkability.rows[0].transitscore,
    bikeScore: walkability.rows[0].bikescore,
});
}
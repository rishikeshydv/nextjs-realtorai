import pool from "@/prisma/pool";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    const {zp_id} = await request.json();
    const query = `
    SELECT 
      kf.owner, 
      kf.sbl, 
      kf.mailing_address, 
      kf.type, 
      kf.use, 
      idfs.street, 
      idfs.city, 
      idfs.state, 
      idfs.zip 
    FROM 
      key_information AS kf 
    LEFT JOIN 
      initial_data_for_sale AS idfs 
    ON 
      kf.zp_id = idfs.zp_id
    WHERE
      kf.zp_id = $1
  `;
  
  const values = [zp_id];
    try {
        const result = await pool.query(query, values);
        if (result.rowCount != null && result.rowCount > 0) {
            return NextResponse.json({
                owner: result.rows[0].owner,
                sbl: result.rows[0].sbl,
                mailing_address: result.rows[0].mailing_address,
                street: result.rows[0].street,
                city: result.rows[0].city,
                state: result.rows[0].state,
                zip: result.rows[0].zip,
                property_type: result.rows[0].type,
                property_use: result.rows[0].use,
            });
        } else {
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error executing query:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
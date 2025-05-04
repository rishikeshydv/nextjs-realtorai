import pool from "@/prisma/pool";
import { NextResponse } from "next/server";
export async function POST(req:Request):Promise<NextResponse>{
    const reqBody = await req.json();
    const { zp_id, userEmail } = reqBody;
    console.log("zp_id", zp_id);
    console.log("userEmail", userEmail);
    async function CheckTableExists(tableName: string) {
        const result = await pool.query(
          `SELECT EXISTS (
              SELECT 1
              FROM information_schema.tables
              WHERE table_schema = 'public'
              AND table_name = $1
          ) AS exists;`,
          [tableName]
        );
      
        const tableExists = result.rows[0]?.exists;
      
        if (!tableExists) {
          const createQuery = `
            CREATE TABLE ${tableName} (
              id SERIAL PRIMARY KEY,
              email VARCHAR(255),
              zp_id VARCHAR(255)
            );
          `;
          await pool.query(createQuery);
        }
      }
      //push into database
      async function PushToDatabase(tableName: string, email: string, zp_id: string) {
        const insertQuery = `
          INSERT INTO ${tableName} (email, zp_id)
          VALUES ($1, $2)
        `;
        await pool.query(insertQuery, [email, zp_id]);
    
      }
    const tableName = "property_holdings";
    await CheckTableExists(tableName);
    if (userEmail) {
      await PushToDatabase(tableName, userEmail, zp_id);
      return NextResponse.json({ message: "Operation completed successfully" });
    } else {
      return NextResponse.json({ message: "Operation failed" });
    }
}
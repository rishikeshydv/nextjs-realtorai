import pool from "@/prisma/pool";
import { NextResponse } from "next/server";
import GetCrimeCategory from "@/mappings/crime_mappings";

export async function POST(request: Request): Promise<NextResponse> {
  const { zp_id } = await request.json();

  if (!zp_id) {
    return NextResponse.json({ message: "zp_id is required" }, { status: 400 });
  }

  const rows = await pool.query(
    `SELECT * FROM initial_data_for_sale WHERE zp_id = $1`,
    [zp_id]
  );

  if (rows.rowCount === 0) {
    return NextResponse.json({ message: "No initial data found for given zp_id" }, { status: 404 });
  }

  const zip_code = rows.rows[0].zip;

  const police_records = await pool.query(
    `SELECT * FROM police_records WHERE zipcode = $1`,
    [zip_code]
  );

  if (police_records.rowCount === 0) {
    return NextResponse.json({ message: "No police records found for zip code" }, { status: 404 });
  }

  const cutoffDate = new Date("2020-01-01");

  const res: { date: Date; time: string; type: "Theft" | "Burglary" | "Assault" | "Sexual Assault" | "Killing" }[] = police_records.rows
    .map((record) => {
        const [dateStr, ...timeParts] = record.incident_date_time.split(" ");
        const time = timeParts.join(" "); // "02:32:57 AM"
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return null; 
      }
      return {
        date,
        time,
        type: GetCrimeCategory(record.incident_type) as "Theft" | "Burglary" | "Assault" | "Sexual Assault" | "Killing" || "Theft",
      };
    })
    .filter((incident): incident is { date: Date; time: string; type: "Theft" | "Burglary" | "Assault" | "Sexual Assault" | "Killing" } => incident !== null && incident.date >= cutoffDate) // filter by date
    .sort((a, b) => b.date.getTime() - a.date.getTime()); // sort by newest

  return NextResponse.json({ incidents: res });
}

import pool from "@/prisma/pool";
import { NextResponse } from "next/server";
interface InspectionData {
    date: string
    result: string
    inspectorName: string
    comments: string
  }
export async function POST(request: Request): Promise<NextResponse> {
    const { zp_id } = await request.json();
    const rows = await pool.query<{ completion_date: string; result: string; inspector_name: string; inspector_comments: string }>(
        `SELECT * FROM general_inspections WHERE zp_id = $1`,
        [zp_id]
    );
    if (rows.rowCount === 0) {
        return NextResponse.json({ message: "No general inspections found for given zp_id" }, { status: 404 });
    }

    const res : InspectionData[] = rows.rows.map((record: { completion_date: string; result: string; inspector_name: string; inspector_comments: string }) => {
        const date = record.completion_date;
        const result = record.result;
        const inspectorName = record.inspector_name;
        const comments = record.inspector_comments;

        return {
            date,
            result,
            inspectorName,
            comments
        };
    }
    );

    //order by date
    res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json({ inspections: res });

}
import pool from "@/prisma/pool";
import { NextResponse } from "next/server";
interface PropertyImage {
  src: string;
}
export async function POST(request: Request) {
  const {zp_id} = await request.json();
  const rows = await pool.query(
    `SELECT * FROM deep_scrape_images WHERE zp_id = $1`,
    [zp_id]
  );
  if (rows.rowCount === 0) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  try {
    const imageList: PropertyImage[] = [];
    rows.rows.forEach((row) => {
      const imageUrl = row.url;
      if (imageUrl) {
        imageList.push({ src: imageUrl });

        }
      });
    return NextResponse.json({ images: imageList });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
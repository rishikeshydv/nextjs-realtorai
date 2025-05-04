import pool from "@/prisma/pool";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {zp_id} = await request.json();
    const rows = await pool.query(
        `SELECT * FROM transfer_history WHERE zp_id = $1`,
        [zp_id]
    );
    if (rows.rowCount === 0) {
        return NextResponse.json({ message: "No data found" }, { status: 404 });
    }

    // saleDate: string;
    // salePrice: number;
    // priorOwner: string;
    // deedBook: string;
    // deedPage: string;
    // deedDate: string;
    const transfers = rows.rows.map((row) => ({
        saleDate: row.sale_date,
        salePrice: parsePrice(row.sale_price),
        priorOwner: row.prior_owner,
        deedBook: row.deed_book,
        deedPage: row.deed_page,
        deedDate: row.deed_date,
    }));

    return NextResponse.json({
        transferList: transfers,
    });
}

function parsePrice(input: string):number {
    const price = input.replace(/[$,]/g, "");
    const parsedPrice = parseInt(price);
    if (isNaN(parsedPrice)) {
        throw new Error("Invalid price format");
    }
    return parsedPrice;

}
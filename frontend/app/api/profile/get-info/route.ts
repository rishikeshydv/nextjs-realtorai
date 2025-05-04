import { NextResponse } from "next/server";
import pool from "@/prisma/pool";

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  const reqBody = await req.json();
  const { userEmail } = reqBody;

  const query = `SELECT email, firstname, lastname, phone, role FROM users WHERE email = $1`;

  try {
    const result = await pool.query(query, [userEmail]);

    if (result.rowCount && result.rowCount > 0) {
      const userProfile: UserProfile = {
        email: result.rows[0].email,
        firstName: result.rows[0].firstname,
        lastName: result.rows[0].lastname,
        phone: result.rows[0].phone,
        role: result.rows[0].role,
      };

      return NextResponse.json({ userProfile: userProfile }, { status: 200 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

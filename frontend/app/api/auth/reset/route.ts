import { UpdatePassword } from "@/prisma/authentication";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    const res = await UpdatePassword(email, password)
    
    if (res === "Password Updated") {
        return NextResponse.json({ message: "Password Updated" });
      } else {
        return NextResponse.json({ error: res });
      }
}


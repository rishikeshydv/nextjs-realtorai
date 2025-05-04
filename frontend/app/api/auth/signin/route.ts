import { CheckCredentials } from "@/prisma/authentication";
import { NextResponse } from "next/server";
type LoginCredentials = {
    email: string;
    password: string;
}

export async function POST(req: Request) {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    const res = await CheckCredentials(
        { email, password } as LoginCredentials
    )
    
    if (res === "Login Successful") {
        return NextResponse.json({ message: "Login Successful" });
      } else {
        return NextResponse.json({ error: res });
      }
}


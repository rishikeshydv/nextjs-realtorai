import { NextResponse } from "next/server";
import { SaveCredentials } from "@/prisma/authentication";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password,phone,role,subscription } = body;
    // save the credentials to the DB
    const res = await SaveCredentials({ firstName,lastName,email, password: password,phone,role,subscription });
    if (res==="User Created"){
        return NextResponse.json({ message: "success" });
    } else {
      return NextResponse.json({ message: res });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "error" });
  }
}
// app/api/auth/route.ts
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token')?.value;
  console.log("Token Value:", token);
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { username: string };
    return NextResponse.json({ username: decoded.username });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

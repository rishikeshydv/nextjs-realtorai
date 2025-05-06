import { NextResponse } from "next/server";
import axios from "axios";
export async function POST(request: Request) {
  const { receipient, subject, start_time, end_time, date } = await request.json();
  console.log({
    receipient,
    subject,
    start_time,
    end_time,   
    date,
  })
  const res = await axios.post("http://10.0.0.2:5002/api/v1/addmeeting", {
    receipient,
    subject,
    start_time,
    end_time,
    date,
  });
  console.log(res.data);
  return NextResponse.json({
    message: "Meeting Created",
    receipient,
    subject,
    start_time,
    end_time,
    date,
  });
}

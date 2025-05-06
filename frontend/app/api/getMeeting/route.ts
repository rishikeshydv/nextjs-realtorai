import { NextResponse } from "next/server";
import axios from "axios";
export async function GET() {
  const res = await axios.get("http://localhost:5002/api/v1/getmeeting");
  console.log(res.data.meetings);
  if ((res.data.meetings).length > 0) {
    return NextResponse.json({
        message: "Meeting Received",
        meetings: res.data.meetings,
      });
  } else {
    return NextResponse.json({
      message: "No meetings found",
    });
  }

}

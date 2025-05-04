import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    const finalizedPlaceTypes: string[] = [
      "shopping_mall",
      "restaurant",
      "bank",
      "police",
      "hospital",
      "bus_station",
      "train_station",
      "airport",
    ];

    const count: Record<string, number> = Object.fromEntries(
      finalizedPlaceTypes.map((type) => [type, 0])
    );

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`;
    const geocodeResponse = await axios.get(geocodeUrl);

    if (!geocodeResponse.data.results?.length) {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 });
    }

    const { lat: latitude, lng: longitude } =
      geocodeResponse.data.results[0].geometry.location;

    const fetches = finalizedPlaceTypes.map(async (type) => {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
      const response = await axios.get(url, {
        params: {
          location: `${latitude},${longitude}`,
          radius: 1500, // 1.5km neighborhood scope
          type,
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        },
      });

      count[type] = response.data.results?.length || 0;
    });

    await Promise.all(fetches);

    return NextResponse.json({ count });
  } catch (err) {
    console.error("Error in place-count API:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

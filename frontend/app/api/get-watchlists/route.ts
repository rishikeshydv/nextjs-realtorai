import pool from "@/prisma/pool";
import { NextResponse } from "next/server";

interface Property {
  id: string;
  image: string;
  name: string;
  location: string;
  price: number;
  predictedPrice: number;
  roi: number;
  arv: number;
  priceGrowth5Y: number;
  walkability: number;
}

const sanitizePrice = (val: string | number | null): number => {
  if (typeof val === "string") {
    return Number(val.replace(/\$|,/g, "")) || 0;
  }
  return typeof val === "number" ? val : 0;
};

function calculateMarketValueDifference(marketValues: string[]): number {
  // Convert market values to integers and remove any non-distinct values
  const distinctValues = Array.from(
    new Set(marketValues.map((value) => parseInt(value.replace(/\$|,/g, ""))))
  );

  // If there are less than 2 distinct values, return 0
  if (distinctValues.length < 2) {
    return 0;
  }

  // Sort the distinct values in descending order to get the most recent ones
  distinctValues.sort((a, b) => b - a);

  // Return the difference between the two most recent distinct values
  return distinctValues[0] - distinctValues[1];
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { userEmail } = await request.json();

    const query = `
SELECT 
  ph.zp_id,
  oi.img_url,
  idfs.street,
  idfs.city,
  idfs.state,
  idfs.zip,
  ds.price,
  mr.predicted_price,
  re.roi,
  re.arv,
  w.walkscore,
  mv.market_values
FROM property_watchlist ph
LEFT JOIN ownership_info oi ON ph.zp_id = oi.zp_id
LEFT JOIN initial_data_for_sale idfs ON ph.zp_id = idfs.zp_id
LEFT JOIN deep_scrape ds ON ph.zp_id = ds.zp_id
LEFT JOIN model_returns mr ON ph.zp_id = mr.zp_id
LEFT JOIN roi_estimations re ON ph.zp_id = re.zp_id
LEFT JOIN walkability w ON ph.zp_id = w.zp_id
LEFT JOIN LATERAL (
  SELECT array_agg(market_value ORDER BY CAST(year AS INTEGER)) AS market_values
  FROM (
    SELECT DISTINCT market_value, year
    FROM valuation
    WHERE zp_id = ph.zp_id
  ) AS distinct_vals
) mv ON TRUE
    WHERE ph.email = $1;
  `;

    const result = await pool.query(query, [userEmail]);

    const res: Property[] = result.rows.map((row) => ({
      id: row.zp_id,
      image: row.img_url ?? "",
      name: row.street ?? "Unknown",
      location: `${row.city ?? ""}, ${row.state ?? ""} ${row.zip ?? ""}`,
      price: sanitizePrice(row.price),
      predictedPrice: sanitizePrice(row.predicted_price),
      roi: sanitizePrice(row.roi),
      arv: sanitizePrice(row.arv),
      priceGrowth5Y: calculateMarketValueDifference(row.market_values || []), // Calculate the difference here
      walkability: sanitizePrice(row.walkscore),
    }));

    return NextResponse.json({ watchlists: res });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

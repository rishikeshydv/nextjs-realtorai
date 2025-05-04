import pool from "@/prisma/pool";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {zp_id} = await request.json();

  try {
    const query = `
    SELECT 
      lf.front,
      lf.depth,
      lf.sqft,
      bil.year_built,
      bil.style,
      bil.stories,
      bil.overall_condition,
      bil.exterior_wall,
      bil.bedrooms,
      bil.full_baths,
      bil.half_baths,
      bil.garages_sqft,
      bir.kitchens,
      bir.basement_type,
      bir.central_air,
      bir.heating_type,
      bir.fireplaces,
      bir.sqft1_story,
      bir.sqft2_story,
      bir.sqft_half_story,
      bir.sqft_three_quarter_story
    FROM 
      land_information AS lf
    JOIN 
      building_information_left AS bil ON lf.zp_id = bil.zp_id
    JOIN 
      building_information_right AS bir ON lf.zp_id = bir.zp_id
    WHERE 
      lf.zp_id = $1
  `;
  
  const values = [zp_id];
  
  const rows = await pool.query(query, values);
  
    
        const landInformation = rows.rows[0];

    if (!landInformation) {
      return NextResponse.json({ error: "Land information not found" }, { status: 404 });
    }

    return NextResponse.json({
        frontage: landInformation.front,
        depth: landInformation.depth,
        squareFootage: landInformation.sqft,
        yearBuilt: landInformation.year_built,
        architectureStyle: landInformation.style,
        stories: landInformation.stories,
        firstStorySquareFootage: landInformation.sqft1_story,
        secondStorySquareFootage: landInformation.sqft2_story,
        halfStorySquareFootage: landInformation.sqft_half_story,
        threeQuarterStorySquareFootage: landInformation.sqft_three_quarter_story,
        overallCondition: landInformation.overall_condition,
        exteriorWallType: landInformation.exterior_wall,
        beds: landInformation.bedrooms,
        fullBaths: landInformation.full_baths,
        halfBaths: landInformation.half_baths,
        kitchen: landInformation.kitchens,
        basementType: landInformation.basement_type,
        centralAir: landInformation.central_air,
        heatingType: landInformation.heating_type,
        fireplaces: landInformation.fireplaces,
        garageSquareFootage: landInformation.garages_sqft,

    });
  } catch (error) {
    console.error("Error fetching land information:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
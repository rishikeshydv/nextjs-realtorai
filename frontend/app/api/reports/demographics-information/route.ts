import pool from "@/prisma/pool";
import { NextResponse } from "next/server";
export async function POST(request:Request){
    const {zp_id} = await request.json();
    const query = `SELECT zip FROM initial_data_for_sale WHERE zp_id = $1`;
    const values = [zp_id];
    try {
        const rows = await pool.query(query, values);
        if (rows.rowCount === 0) {
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
        const data = rows.rows[0];
        const zipCode = data.zip;

        const demographicsQuery = `SELECT * FROM population_data WHERE zip_code = $1`;
        const demographicsValues = [zipCode];
        const demographicsRows = await pool.query(demographicsQuery, demographicsValues);
        if (demographicsRows.rowCount === 0) {
            return NextResponse.json({ message: "No demographic data found" }, { status: 404 });
        }
        const demographicsData = demographicsRows.rows[0];

        return NextResponse.json({
            totalPopulation: parseInt(demographicsData.total_population),
            malePopulation: parseInt(demographicsData.male_population),
            femalePopulation: parseInt(demographicsData.female_population),
            ethnicityBreakdown: [
                {
                    name: "White",
                    value: parseInt(demographicsData.white_population),
                    color: "#4f46e5"
                },
                {
                    name: "Black",
                    value: parseInt(demographicsData.black_population),
                    color: "#8b5cf6"
                },
                {
                    name: "American Indian/Alaska Native",
                    value: parseInt(demographicsData.american_indian_alaska_native_population),
                    color: "#ec4899"
                },
                {
                    name: "Asian",
                    value: parseInt(demographicsData.asian_population),
                    color: "#f43f5e"
                },
                {
                    name: "Native Hawaiian/Pacific Islander",
                    value: parseInt(demographicsData.native_hawaiian_pacific_islander_population),
                    color: "#f97316"
                },
                {
                    name: "Other Races",
                    value: parseInt(demographicsData.some_other_race_population),
                    color: "#eab308"
                }
            ],
            citizenPopulation: {
                total: parseInt(demographicsData.citizen_18_and_over_population),
                male: parseInt(demographicsData.male_citizen_18_and_over_population),
                female: parseInt(demographicsData.female_citizen_18_and_over_population)
            }
        })
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
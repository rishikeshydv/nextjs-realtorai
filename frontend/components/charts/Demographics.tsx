"use client"
import React, {useState, useEffect} from "react";
import BarVertical from "@/components/charts/bar-vertical";
import BarHorizontal from "@/components/charts/bar-horizontal";
import DonutChart from "@/components/charts/donut-chart";
import { AnalyticsMenu } from "../analytics/AnalyticsMenu";
import NewRadialChart from "./new-radial-chart";
import { TbGenderDemigirl } from "react-icons/tb";
import axios from "axios";
import { FaPercentage } from "react-icons/fa";
interface GenderData{
  male_population: number;
  female_population: number;
}
interface EthnicityData{
  white_population: number;
  black_population: number;
  asian_population: number;
  american_indian_alaska_native_population: number;
  native_hawaiian_pacific_islander_population: number;
  some_other_race_population: number;
}

interface Walkability {
  walk_score: number;
  bike_score: number;
}

interface NeighborhoodData {
  shopping_mall: number;
  restaurant: number;
  bank: number;
  police: number;
  hospital: number;
  bus_station: number;
  train_station: number;
  airport: number;
}
export default function DemographicsChart({
  analyticsCategory,
  setAnalyticsCategory,
  analyzedPropertyId,
  analyzedPropertyZip,
  analyticsAddress 
}: {
  analyticsCategory: string;
  setAnalyticsCategory: React.Dispatch<React.SetStateAction<string>>;
  analyzedPropertyId: string | null;
  analyzedPropertyZip: string | null;
  analyticsAddress: string | null;
}) {

  const [genderData, setGenderData] = useState<GenderData | null>(null);
  const [ethnicityData, setEthnicityData] = useState<EthnicityData | null>(null);
  const [walkabilityData, setWalkabilityData] = useState<Walkability | null>(null);
  const [neighborhoodData, setNeighborhoodData] = useState<NeighborhoodData | null>(null);

  const fetchGenderData = async () => {
    await axios.post("/api/charts/population",{zip: analyzedPropertyZip})
      .then((response) => {
        setGenderData({
          male_population: response.data.male_population,
          female_population: response.data.female_population,
        });
        setEthnicityData({
          white_population: response.data.white_population,
          black_population: response.data.black_population,
          asian_population: response.data.asian_population,
          american_indian_alaska_native_population: response.data.american_indian_alaska_native_population,
          native_hawaiian_pacific_islander_population: response.data.native_hawaiian_pacific_islander_population,
          some_other_race_population:response.data.some_other_race_population
      })
  })
}

const fetchWalkability = async () => {
  await axios.post("/api/charts/walkabillity", {
    zp_id: analyzedPropertyId,
  })
    .then((response) => {
      setWalkabilityData({
        walk_score: response.data.walkscore,
        bike_score: response.data.bikescore,
      });
    })
    .catch((error) => {
      console.error("Error fetching walkability data:", error);
    });
}

const fetchNeighborhoodData = async () => {
  await axios.post("/api/charts/neighbourhood", {
    address: analyticsAddress,
  })
    .then((response) => {
      setNeighborhoodData({
        shopping_mall: response.data.count.shopping_mall,
        restaurant: response.data.count.restaurant,
        bank: response.data.count.bank,
        police: response.data.count.police,
        hospital: response.data.count.hospital,
        bus_station: response.data.count.bus_station,
        train_station: response.data.count.train_station,
        airport: response.data.count.airport,
      });
    }
    )
    .catch((error) => {
      console.error("Error fetching neighborhood data:", error);
    }
    );
}

useEffect(() => {
  if (analyzedPropertyZip) {
    fetchGenderData();
  }
  if (analyzedPropertyId) {
    fetchWalkability();
  }
  if (analyticsAddress) {
    fetchNeighborhoodData();
  }
}, [analyzedPropertyId, analyzedPropertyZip, analyticsAddress]);


  return (
    <div className="py-4 pl-4 pr-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar Menu - takes 2 columns on medium screens, 1 on large */}
        <div className="md:col-span-2 lg:col-span-1">
          <div className="h-full rounded-lg shadow-none px-4">
            <AnalyticsMenu
              analyticsCategory={analyticsCategory}
              setAnalyticsCategory={setAnalyticsCategory}
              zp_id={analyzedPropertyId || ""}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-11 flex flex-col gap-6">
          {/* Row 1: Bar Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg flex flex-col h-full">
              <div className="flex-1 flex items-center">
                <BarHorizontal
                  data={
                    ethnicityData || {
                      white_population: 0,
                      black_population: 0,
                      asian_population: 0,
                      american_indian_alaska_native_population: 0,
                      native_hawaiian_pacific_islander_population: 0,
                      some_other_race_population: 0,
                    }
                  }
                />
              </div>
            </div>
            <div className="rounded-lg flex flex-col h-full">
              <div className="flex-1 flex items-center">
                <BarVertical
                  data={
                    neighborhoodData || {
                      shopping_mall: 0,
                      restaurant: 0,
                      bank: 0,
                      police: 0,
                      hospital: 0,
                      bus_station: 0,
                      train_station: 0,
                      airport: 0,
                    }
                  }
                />
              </div>
            </div>
          </div>

          {/* Row 2: Radial and Donut Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#437a4520] rounded-lg shadow p-4 flex flex-col items-start justify-center h-full">
              <div 
        className="text-[16px] flex items-center  justify-center gap-2 px-0">
      <div className=" flex justify-center items-center w-[40px] h-[40px] rounded-lg  px-1 bg-[url(/bgs/button-bg.png)] bg-gray-100/10 shadow-lg border-4 border-gray-300">
        <FaPercentage className="w-5 h-5 text-black" />
      </div>
      <span
        className="text-gray-400 font-semibold text-[18px]"
        style={{
          background:
            "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
        Walk Score
      </span>
        </div>
                <div className="flex-1 flex items-center justify-center w-full">
                  <NewRadialChart value={walkabilityData?.walk_score ?? 0} title="Walk Score" subtext="Score" />
                </div>
              </div>
              <div className="bg-[#437a4520] rounded-lg p-4 flex flex-col items-start justify-center h-full">
               
              <div 
        className="text-[18px] flex items-center justify-center gap-2 px-0">
      <div className=" flex justify-center items-center w-[40px] h-[40px] rounded-lg  px-1 bg-[url(/bgs/button-bg.png)] bg-gray-100/10 shadow-lg border-4 border-gray-300">
        <FaPercentage className="w-5 h-5 text-primary" />
      </div>
      <span
        className="text-gray-400 font-semibold text-[20px]"
        style={{
          background:
            "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
        Bike Score
      </span>
        </div>
                <div className="flex-1 flex items-center justify-center w-full">
                  <NewRadialChart value={walkabilityData?.bike_score ?? 0} title="Bike Score" subtext="Score" />
                </div>
              </div>
            </div>

            <div className="bg-[#437a4520] rounded-lg p-4 flex flex-col items-start h-full">
            <div 
        className="text-[18px] flex items-center  justify-center gap-2 px-0">
      <div className=" flex justify-center items-center w-[40px] h-[40px] rounded-lg  px-1 bg-[url(/bgs/button-bg.png)] bg-gray-100/10 shadow-lg border-4 border-gray-300">
        <TbGenderDemigirl className="w-5 h-5 text-primary" />
      </div>
      <span
        className="text-gray-400 font-semibold text-[20px]"
        style={{
          background:
            "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
        Gender Data
      </span>
        </div>
              <div className="flex-1 flex items-center justify-center w-full">
                <DonutChart
                  data={
                    genderData || {
                      male_population: 0,
                      female_population: 0,
                    }
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
  }
"use client";
import React from "react";
// import BarHorizontal from "@/components/charts/bar-horizontal";
import RadialChart from "./radial-chart";
import SingleValue from "./single-value";
import NewAreaChart from "./new-area-chart";
import { AnalyticsMenu } from "../analytics/AnalyticsMenu";
import ThreeValue from "./three-value";
import SingleValuePredicted from "./single-value-predicted";
import axios from "axios";

interface ReturnType {
  zp_id: string;
  predicted_price: string;
  sales_probability: string;
  roi: string;
  arv: string;
  mortgage: string;
}
export default function FinanceCharts({
  analyticsCategory,
  setAnalyticsCategory,
  analyzedPropertyId,
}: {
  analyticsCategory: string;
  setAnalyticsCategory: React.Dispatch<React.SetStateAction<string>>;
  analyzedPropertyId: string | null;
}) {
  const [modelReturns, setModelReturns] = React.useState<ReturnType[]>([]);
  const FetchModelReturns = async() => {
    await axios.post("/api/get-model-returns", {
      zp_id: analyzedPropertyId,
    })
    .then((response) => {
      setModelReturns(response.data.data);
    })
    .catch((error) => {
      console.error("Error fetching model returns:", error);
    });
  }
  React.useEffect(() => {
    if (analyzedPropertyId) {
      FetchModelReturns();
    }
  }, [analyzedPropertyId]);

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

        {/* Main Content - takes 10 columns on medium screens, 11 on large */}
        <div className="md:col-span-10 lg:col-span-11">
          <div className="flex flex-col gap-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Area Chart */}
              <div className="lg:col-span-9">
                <div className="bg-[#437a4520] rounded-lg shadow-sm p-4 h-full min-h-[300px] flex flex-col">
                  <NewAreaChart analyzedPropertyId={analyzedPropertyId || ""} />
                </div>
              </div>

              {/* Value Cards */}
              <div className="lg:col-span-3">
                <div className="bg-[#437a4520] rounded-lg shadow-sm p-4 h-full flex flex-col justify-between gap-4">
                  <div className="flex-1 flex flex-col justify-center">
                    <SingleValue Title="Actual Price" blue={true} analyzedPropertyId={analyzedPropertyId} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <SingleValuePredicted Title="Predicted Price" blue={false} value={modelReturns[0]?.predicted_price || "N/A"} />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Three Values */}
              <div className="lg:col-span-9">
                <div className="bg-[#437a4520] rounded-lg shadow-sm p-4 h-full min-h-[200px] flex items-center">
                  <ThreeValue value1={modelReturns[0]?.roi} value2={modelReturns[0]?.arv} value3={modelReturns[0]?.mortgage} />
                </div>
              </div>

              {/* Radial Chart */}
              <div className="lg:col-span-3">
                <div className="bg-[#437a4520] rounded-lg shadow-sm p-4 h-full min-h-[200px] flex items-center justify-center">
                  <RadialChart title="Sales Probability" value={Number(modelReturns[0]?.sales_probability)} subtext="Days" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

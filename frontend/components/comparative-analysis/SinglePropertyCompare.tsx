import React from "react";
import { CompareData } from "@/types/CompareData";
import { IoBedSharp } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { FaRulerCombined } from "react-icons/fa";
import { IoHourglass } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { MdAutoGraph } from "react-icons/md";
import { PiCalendarFill } from "react-icons/pi";
import { TbCirclePercentageFilled } from "react-icons/tb";
import { FaPeopleCarry } from "react-icons/fa";
import { IoReceipt } from "react-icons/io5";
import { FaWalking } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { PiSirenFill } from "react-icons/pi";
interface InfoUIProps {
  svg: React.ReactNode;
  value1: string;
  value2: string;
  description: string;
}


type PropertyState =
  | "physical_attributes"
  | "financial_attributes"
  | "market_attributes"
  | "location_attributes";

export default function SinglePropertyCompare({
  propertyData,
  otherData,
  currentState,
}: {
  propertyData: CompareData;
  otherData: CompareData;
  currentState: PropertyState;
}) {
  console.log("Property Data: ", propertyData);
  console.log("Other Data: ", otherData);
  return (
    <div className="p-2 rounded-xl bg-[#437a4520]">
      <div className="flex flex-col gap-4 border-b-[1px] border-gray-700">
        {/* image */}
        <div className="rounded-lg flex justify-center items-center overflow-hidden">
        <img src={propertyData.image_url} alt="" className="rounded-lg" />
      </div>

        {/* Property Address */}
        <div className="pb-3">
          <p
            className="text-center font-semibold text-[22px] tracking-tight"
            style={{
              background:
                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {propertyData.address}
          </p>
        </div>
      </div>
      {/* infos */}
      <div className="flex flex-col gap-10 p-4 h-[25em] overflow-y-auto">
        {propertyData[currentState] &&
          Object.entries(propertyData[currentState]).map(([key, value]) => {
            return (
              <InfoUI
                key={key}
                svg={<SvgController keyType={key} />}
                value1={smartFormat(value)}
                value2={
                  smartFormat(otherData[currentState][
                    key as keyof (typeof otherData)[typeof currentState]
                  ])
                }
                description={key}
              />
            );
          })}
      </div>
    </div>
  );
}

function smartFormat(value: string | number): string {
  const stringVal = String(value).trim();

  // If it already has a comma, return as is
  // if (stringVal.includes(",")) return stringVal;

  // If it starts with $, format the number part
  if (stringVal.startsWith("$")) {
      const numPart = Number(stringVal.replace(/\$|,/g, ""));
      return `$${numPart.toLocaleString()}`;
  }

  // Try to parse and format any other numeric string
  const num = Number(stringVal);
  if (!isNaN(num)) {
      return num.toLocaleString();
  }

  // Fallback: return original string
  return stringVal;
}

function smartFormatNumber(value: string): number {
  //replace all commas
  const stringVal = String(value).trim();
  const num = Number(stringVal.replace(/,/g, ""));
  if (!isNaN(num)) {
    return num;
  }
  // Fallback: return original string
  return Number(stringVal);
}

const InfoUI = ({ svg, value1, value2, description }: InfoUIProps) => {

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {/* svg */}
      <div className="p-5 rounded-xl bg-[#212735]">{svg}</div>
      {/* value */}
      <div>
        <div className="flex justify-center items-center space-x-2">
          <span
            className="text-[48px] font-bold"
            style={{
              background:
                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            {value1}
          </span> 
          {
            value1?.[0] === "$" && value2?.[0] === "$" ? (
              <span className="">
              {smartFormatNumber(value1.slice(1,value1.length)) > smartFormatNumber(value2.slice(1,value2.length)) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#4a3a80] font-extrabold lucide lucide-trending-up-icon lucide-trending-up"
                >
          <defs>
            <radialGradient id="highlightGradient" cx="12" cy="12" r="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="30%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" filter="url(#glow)" />
          <polyline points="16 7 22 7 22 13" filter="url(#glow)" />
          <polyline
            points="22 7 13.5 15.5 8.5 10.5 2 17"
            stroke="url(#highlightGradient)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <polyline points="16 7 22 7 22 13" stroke="url(#highlightGradient)" strokeWidth="1.5" opacity="0.7" />
                </svg>
              ) : smartFormatNumber(value1.slice(1,value1.length)) < smartFormatNumber(value2.slice(1,value2.length)) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#4a3a80] font-extrabold lucide lucide-trending-down-icon lucide-trending-down"
                >
                          <defs>
            <radialGradient id="highlightGradient" cx="12" cy="12" r="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="30%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
                  <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                  <polyline points="16 17 22 17 22 11" />
                  <polyline
            points="22 17 13.5 8.5 8.5 13.5 2 7"
            stroke="url(#highlightGradient)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <polyline points="16 17 22 17 22 11" stroke="url(#highlightGradient)" strokeWidth="1.5" opacity="0.7" />
                </svg>
              ) : (
                ""
              )           
            }
            </span>
            ):(
              <span className="">
              {Number(value1) > Number(value2) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#4a3a80] font-extrabold lucide lucide-trending-up-icon lucide-trending-up"
                >
          <defs>
            <radialGradient id="highlightGradient" cx="12" cy="12" r="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="30%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" filter="url(#glow)" />
          <polyline points="16 7 22 7 22 13" filter="url(#glow)" />
          <polyline
            points="22 7 13.5 15.5 8.5 10.5 2 17"
            stroke="url(#highlightGradient)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <polyline points="16 7 22 7 22 13" stroke="url(#highlightGradient)" strokeWidth="1.5" opacity="0.7" />
                </svg>
              ) : Number(value1) < Number(value2) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#4a3a80] font-extrabold lucide lucide-trending-down-icon lucide-trending-down"
                >
                          <defs>
            <radialGradient id="highlightGradient" cx="12" cy="12" r="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.9" />
              <stop offset="30%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>
                  <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                  <polyline points="16 17 22 17 22 11" />
                  <polyline
            points="22 17 13.5 8.5 8.5 13.5 2 7"
            stroke="url(#highlightGradient)"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <polyline points="16 17 22 17 22 11" stroke="url(#highlightGradient)" strokeWidth="1.5" opacity="0.7" />
                </svg>
              ) : (
                ""
              )
            }
            </span>
            )
          }
        </div>
      </div>
      {/* description */}
      <div className="mt-[-20px]">
        <span className="text-sm text-[#000000] font-bold">
          &nbsp;{ValueController({ keyType: description })}
        </span>
      </div>
    </div>
  );
};

const SvgController = ({ keyType }: { keyType: string }) => {
  if (keyType === "beds") {
    return <IoBedSharp className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "baths") {
    return <FaBath className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "sqft") {
    return <FaRulerCombined className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "kitchen") {
    return <FaKitchenSet className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "age") {
    return <IoHourglass className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "actual_price") {
    return <FaSackDollar className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "predicted_price") {
    return <FaLightbulb className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "price_per_sqft") {
    return <IoIosPricetags className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "price_change_in_last_5_years") {
    return <MdAutoGraph className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "days_on_market") {
    return <PiCalendarFill className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "sales_probability") {
    return <TbCirclePercentageFilled className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "total_ownership_transfer") {
    return <FaPeopleCarry className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "tax_assessed") {
    return <IoReceipt className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "walk_score") {
    return <FaWalking className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "bike_score") {
    return <MdDirectionsBike className="h-6 w-6 text-[#ffffff95]" />;
  } else if (keyType === "crime_score") {
    return <PiSirenFill className="h-6 w-6 text-[#ffffff95]" />;
  } else {
    return <div></div>;
  }
};

const ValueController = ({ keyType }: { keyType: string }) => {
  if (keyType === "beds") {
    return "Bedroom(s)";
  } else if (keyType === "baths") {
    return "Bathroom(s)";
  } else if (keyType === "sqft") {
    return "Square Feet";
  } else if (keyType === "kitchen") {
    return "Kitchen(s)";
  } else if (keyType === "age") {
    return "Year(s) Old";
  } else if (keyType === "actual_price") {
    return "Current Price";
  } else if (keyType === "predicted_price") {
    return "Predicted Price";
  } else if (keyType === "price_per_sqft") {
    return "Per Square Feet";
  } else if (keyType === "price_change_in_last_5_years") {
    return "Change in 5 years";
  } else if (keyType === "days_on_market") {
    return "Days on Market";
  } else if (keyType === "sales_probability") {
    return "Sales Probability";
  } else if (keyType === "total_ownership_transfer") {
    return "Ownership Transfers";
  } else if (keyType === "tax_assessed") {
    return "Tax Assessed Value";
  } else if (keyType === "walk_score") {
    return "Walk Score";
  } else if (keyType === "bike_score") {
    return "Bike Score";
  } else if (keyType === "crime_score") {
    return "Crime Score";
  } else {
    return "";
  }
};

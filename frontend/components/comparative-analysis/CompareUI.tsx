"use client"
import React,{useState} from "react";
import { CompareData } from "@/types/CompareData";
import SinglePropertyCompare from "./SinglePropertyCompare";
import { FaHouseChimneyCrack } from "react-icons/fa6";
import { TbZoomMoneyFilled } from "react-icons/tb";
import { MdOutlineAutoGraph } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import axios from "axios";
type PropertyState =
  | "physical_attributes"
  | "financial_attributes"
  | "market_attributes"
  | "location_attributes";

export default function CompareUI({
  analyzedPropertyId,
  comparedPropertyId
}:{
  analyzedPropertyId: string;
  comparedPropertyId: string;
}) {
  const [currentState, setCurrentState] = useState<PropertyState>("physical_attributes");

  //handling API
  const [property1, setProperty1] = useState<CompareData | null>(null);
  const [property2, setProperty2] = useState<CompareData | null>(null);

  const defaultPropertyData: CompareData = {
    image_url: "/property/prop-img.png",
            address: "1234 Main St, San Francisco, CA 94105",
            physical_attributes: {
              beds: 3,
              baths: 2,
              sqft: 2000,
              kitchen: 1,
              age: 25,
            },
            financial_attributes: {
              actual_price: "$ 200000",
              predicted_price: "$ 250000",
              price_per_sqft: "$ 100",
              price_change_in_last_5_years: "$ 25000",
            },
            market_attributes: {
              days_on_market: 30,
              sales_probability: 0.8,
              total_ownership_transfer: 2,
              tax_assessed: "$ 2000",
            },
            location_attributes: {
              walk_score: 80,
              bike_score: 70,
              crime_score: 0.2,
            },
          }  

  const getPropertyData = async () => {
    try {
      const response = await axios.post("/api/comparative-analysis", {
        main_property_id: analyzedPropertyId,
        compare_property_id: comparedPropertyId,
      });
      setProperty1(response.data.main_property_info);
      setProperty2(response.data.compare_property_info);
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  }

  React.useEffect(() => {
    getPropertyData();
  }, [analyzedPropertyId, comparedPropertyId]);

  //menubar contents
  const [activeItem, setActiveItem] = useState("physical_attributes")

  const menuItems = [
    { id: "physical_attributes", label: "Physical Attributes", icon: <FaHouseChimneyCrack className="h-5 w-5" /> },
    { id: "financial_attributes", label: "Financial Attributes", icon: <TbZoomMoneyFilled className="h-5 w-5" /> },
    { id: "market_attributes", label: "Market Attributes", icon: <MdOutlineAutoGraph className="h-5 w-5" /> },
    { id: "location_attributes", label: "Location Attributes", icon: <FaMapLocationDot className="h-5 w-5" /> },
  ]
  return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  {/* first info col */}
  <div className="flex flex-col">
    {/* Big Texts */}
    <div>
      <p className="text-[22px] md:text-[26px] font-semibold tracking-tight">
        Compare Homes Like a Pro:
      </p>
      <p
        className="text-[30px] md:text-[38px] tracking-tight font-bold"
        style={{
          background: "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Only with NexBrick
      </p>
    </div>

    {/* small text */}
    <div className="mt-4">
      <p className="text-[#000000] font-extralight text-left tracking-tight text-[14px] md:text-[16px]">
        NexBrick makes property comparisons effortless by providing in-depth insights on price trends, ownership history, market performance, and neighborhood scores—all in one place. Whether you&apos;re buying, selling, or investing, NexBrick helps you make smarter real estate decisions with confidence.
      </p>
    </div>

    {/* menubar*/}
    <div className="outline-none rounded-xl relative">
      <div className="flex w-full bg-[#437a4520] rounded-xl flex-col gap-4 p-4 my-10 outline-none border-none">
        {menuItems.map((item) => (
          <MenuItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            onClick={() => {
              setActiveItem(item.id);
              setCurrentState(item.id as PropertyState);
            }}
          />
        ))}
      </div>
    </div>
  </div>

  {/* property 1 compare */}
  <div>
    <SinglePropertyCompare
      propertyData={property1 || defaultPropertyData}
      otherData={property2 || defaultPropertyData}
      currentState={currentState}
    />
  </div>

  {/* property 2 compare */}
  <div>
    <SinglePropertyCompare
      propertyData={property2 || defaultPropertyData}
      otherData={property1 || defaultPropertyData}
      currentState={currentState}
    />
  </div>
</div>

  );
}

interface MenuItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
}

const MenuItem = ({ icon, label, isActive, onClick }: MenuItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isActive ? "default" : "ghost"}
            size="lg"
            className={cn(
              "w-full justify-start gap-3 text-left border-b-1 border-gray-700",
              isActive ? "hover: text-white border border-[#15171c] shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]" : "hover:bg-muted",
            )}
            onClick={onClick}
          >
            {icon}
            <span className="text-[16px] font-extralight">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" align="center" className="hidden md:block">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
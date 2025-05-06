"use client";
import React, {useState} from "react";
import { Search } from 'lucide-react';
import { Input } from "../ui/input";
import { AiOutlineInfoCircle } from "react-icons/ai";
import SearchPropertyCard from "../property-card/SearchResultsCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AnimatePresence, motion } from "motion/react";
interface PropertyDetails{
  zp_id: string;
  zip: string;
  address: string;
  image: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  year_built: number;
  property_type: string;
}

interface ReturnHotProperty{
  zp_id: string;
  details: PropertyDetails;
}

export default function HotPropertyDeals({
 setShowAnalytics, 
 handleAnalytics,
 userEmail,
 setAnalyzedPropertyId, 
 setAnalyzedPropertyZip, 
 analytics,
 latestHotProperties,
 setHidePropertyHoldings
}: {
    setShowAnalytics: React.Dispatch<React.SetStateAction<boolean>>;
    handleAnalytics?: () => void; 
    userEmail: string;
    setAnalyzedPropertyId: React.Dispatch<React.SetStateAction<string | null>>;
    setAnalyzedPropertyZip: React.Dispatch<React.SetStateAction<string | null>>;
    analytics: boolean;
    latestHotProperties: ReturnHotProperty[];
    setHidePropertyHoldings: React.Dispatch<React.SetStateAction<boolean>>;

}) {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="px-4 py-4 bg-[#437a4520] rounded-xl my-10">
      <div
        className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0"

      >
        <div className="flex items-center justify-center space-x-2">
        <p className="text-[20px] tracking-tight"
                  style={{
                    background: "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
          >Hot Property Deals</p>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
              <AiOutlineInfoCircle className="w-4 h-4 text-primary"/>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-center w-[30%] bg-gray-100 text-primary p-2 rounded-lg text-[14px] border border-gray-400/40">
              <p>
                <span className="font-bold">Hot Property Deals</span> are high-demand real estate opportunities that sell quickly, often above asking price. They offer exceptional investment potential and require swift action to secure.
              </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

          <div className="flex items-center justify-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] text-primary rounded-xl px-2 py-1">
          <Search />
          <Input id="firstName" defaultValue="Buffalo, NY" className="border-none outline-none text-primary"/>
          </div>
      </div>
      <div 
        className="grid grid-flow-col auto-cols-[290px] gap-4 px-4 overflow-x-auto my-4 snap-x scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >

        {latestHotProperties.map((property, index) => (
          <div 
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative group block"
          >
        <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
          <SearchPropertyCard zip={property.details.zip} image={property.details.image} price={property.details.price} sqft={property.details.sqft.toString()} baths={property.details.baths} beds={property.details.beds} address={property.details.address} key={index} {...property} setShowAnalytics={setShowAnalytics} handleAnalytics={handleAnalytics} userEmail={userEmail} setAnalyzedPropertyId={setAnalyzedPropertyId} setAnalyzedPropertyZip={setAnalyzedPropertyZip} analytics={analytics} setHidePropertyHoldings={setHidePropertyHoldings}/>
          </div>
        ))}
      </div>
    </div>
  );
}

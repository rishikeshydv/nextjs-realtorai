"use client";
import React, { useEffect } from "react";
import PropertyCard from "../property-card/PropertyCard";
import axios from "axios";
import { AnimatePresence, motion } from "motion/react";
interface PropertyDetails {
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

interface ReturnPropertyDetails {
  zp_id: string;
  details: PropertyDetails;
  qualify: boolean;
}
export default function PropertyHoldings({
  user_email, setShowAnalytics, handleAnalytics, setAnalyzedPropertyId, setAnalyzedPropertyZip,setHidePropertyHoldings
}: {
  user_email: string;
  setShowAnalytics: React.Dispatch<React.SetStateAction<boolean>>;
  handleAnalytics?: () => void; // Default function if not provided
  setAnalyzedPropertyId: React.Dispatch<React.SetStateAction<string | null>>;
  setAnalyzedPropertyZip: React.Dispatch<React.SetStateAction<string | null>>;
  setHidePropertyHoldings: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [propertyHoldings, setPropertyHoldings] = React.useState<ReturnPropertyDetails[]>([]);
  useEffect(() => {
     axios.post("/api/get-holdings", {
      userEmail: user_email,
    })
    .then((response) => {
      setPropertyHoldings(response.data.properties);
    }
    )
    .catch((error) => {
      console.error("Error fetching property holdings:", error);
    }
    );
  }, [user_email]);

      const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);


  return (
    <div className="px-4 py-4 bg-[#437a4520] rounded-xl  mt-6">
      <div
        className="text-[20px] tracking-tight"
        style={{
          background: "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
        Your Property Holdings
      </div>
      {
        propertyHoldings.length > 0 ? (
          <div 
          className="grid grid-flow-col auto-cols-[290px] gap-4 px-4 overflow-x-auto my-4 snap-x scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
          {propertyHoldings.map((property, index) => (
            <div key={index}
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

          <PropertyCard 
            key={index} 
            {...property.details}
            sqft={property.details.sqft.toString()}  
            setShowAnalytics={setShowAnalytics} 
            handleAnalytics={handleAnalytics}
            setAnalyzedPropertyId={setAnalyzedPropertyId}
            setAnalyzedPropertyZip={setAnalyzedPropertyZip}
            setHidePropertyHoldings={setHidePropertyHoldings}
            />
            </div>
          ))}
        </div>
        ):(
          <Loading />
        )
      }

    </div>
  );
}



const Loading = ()=>{
  return (
    <div className="space-y-4 px-16 py-8">
      <div className="h-8 w-1/3 bg-gray-200 rounded-md animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="border-none outline-none rounded-lg p-4 space-y-4">
      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

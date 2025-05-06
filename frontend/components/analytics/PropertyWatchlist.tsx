"use client";
import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
interface Property {
  id: string;
  image: string;
  name: string;
  location: string;
  price: number; // Property price
  predictedPrice: number; // AI-predicted price
  roi: number; // Return on Investment (percentage)
  arv: number; // After Repair Value (ARV)
  priceGrowth5Y: number; // Price Growth in last 5 years (percentage)
  walkability: number; // Walkability score (0-100)
}

export default function PropertyWatchlist({
  user_email,
  setShowAnalytics, 
  handleAnalytics, 
  setAnalyzedPropertyId,
  setHidePropertyHoldings
}: {
  user_email: string;
  setShowAnalytics: React.Dispatch<React.SetStateAction<boolean>>;
  handleAnalytics: () => void; // Default function if not provided
  setAnalyzedPropertyId: React.Dispatch<React.SetStateAction<string | null>>;
  setHidePropertyHoldings: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  //dummy data
  const [propertyWatchlist,setPropertyWatchlist] = useState<Property[]>([])
  const priceFormatter = (value: number): string => {
    if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
    } else if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
    } else {
      return `$${Math.floor(value)}`;
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/get-watchlists", {
          userEmail: user_email,
        });
        const data = response.data.watchlists;
        // Format the data
        const formattedData = data.map((property: Property) => ({
          ...property,
          price: priceFormatter(property.price),
          predictedPrice: priceFormatter(property.predictedPrice),
          roi: priceFormatter(property.roi),
          arv: priceFormatter(property.arv),
          priceGrowth5Y: priceFormatter(property.priceGrowth5Y),
        }));
        setPropertyWatchlist(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  },[user_email]);
  


  return (
<div className="px-4 py-4 bg-[#437a4520] rounded-xl mt-10 w-full">
      <h1
        className="text-[20px] tracking-tight"
        style={{
          background: "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
        Your Property Watchlist
      </h1>
      <div className="border rounded-lg overflow-hidden my-6 mx-4">
        <div className="overflow-x-auto ">
          <div className="max-h-[500px] overflow-y-auto ">
            <Table className="">
              <TableHeader>
                <TableRow className="bg-[#1a1d2410] border border-[#15171c] shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
                  <TableHead className="border-r-1 border-gray-400/10 text-center font-semibold text-[15px] tracking-wide">
                    Name
                  </TableHead>
                  <TableHead className="border-r-1 border-gray-400/10 text-center font-semibold text-[15px] tracking-wide">
                    Location
                  </TableHead>
                  <TableHead className="border-r-1 border-gray-400/10 text-center hover:cursor-wait  font-semibold text-[15px] tracking-wide">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p> Actual Price</p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Latest Market Assessed Value</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="border-r-1 border-gray-400/10 text-center hover:cursor-wait font-semibold text-[15px] tracking-wide">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p> BrickAI Price</p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>BrickAI Price Prediction - NexBrick&apos;s AI Excellence.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="border-r-1 border-gray-400/10 text-center  hover:cursor-wait font-semibold text-[15px] tracking-wide">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p> RoI</p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Return on Investment in 5 years calculated with BrickAI intelligence.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="border-r-1 border-gray-400/10 text-center hover:cursor-wait font-semibold text-[15px] tracking-wide">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p> ARV</p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>After Repair Value calculated with BrickAI intelligence.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="border-r-1 border-gray-400/10 text-center hover:cursor-wait font-semibold text-[15px] tracking-wide">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p> Price Change</p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Price change over the last 5 years.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="border-r-1 border-gray-400/10 text-center hover:cursor-wait font-semibold text-[15px] tracking-wide">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p>Walkability</p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Walkabilility Score</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-[15px] tracking-wide">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {propertyWatchlist.map((property) => (
                  <TableRow
                    key={property.id}
                    className="shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]"
                  >
                    <TableCell className="text-[14px] text-gray-400/90">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-sm  flex justify-center items-center">
                          <img
                            src={property.image || "/placeholder.svg"}
                            alt={property.name}
                            className="object-cover rounded-md"
                          />
                        </div>
                        <span className="font-medium">{property.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-gray-400/90">{property.location}</TableCell>
                    <TableCell className="text-center text-gray-400/90">{property.price}</TableCell>
                    <TableCell className="text-center text-gray-400/90">{property.predictedPrice}</TableCell>
                    <TableCell className="text-center text-gray-400/90">{property.roi}</TableCell>
                    <TableCell className="text-center text-gray-400/90">{property.arv}</TableCell>
                    <TableCell className="text-center text-gray-400/90">{property.priceGrowth5Y}</TableCell>
                    <TableCell className="text-center text-gray-400/90">{property.walkability}</TableCell>
                    <TableCell className="text-center text-gray-400/90">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]"
                        onClick={() => {
                          setAnalyzedPropertyId(property.id);
                          setShowAnalytics(true);
                          handleAnalytics();
                          setHidePropertyHoldings(true);
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Analytics
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

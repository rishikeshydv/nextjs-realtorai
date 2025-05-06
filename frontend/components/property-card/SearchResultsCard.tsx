"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { ChartNoAxesCombined } from "lucide-react";
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoEye } from "react-icons/io5";
import { FaHouseDamage } from "react-icons/fa";
import axios from "axios";
import { GlowingEffect } from "@/components/ui/glowing-effect";
interface PropertyCardProps {
  zp_id: string;
  zip: string;
  image: string;
  price: string;
  sqft: string;
  baths: number;
  beds: number;
  address: string;
  setShowAnalytics: React.Dispatch<React.SetStateAction<boolean>>;
  handleAnalytics?: () => void;
  userEmail: string;
  setAnalyzedPropertyId: React.Dispatch<React.SetStateAction<string | null>>;
  setAnalyzedPropertyZip: React.Dispatch<React.SetStateAction<string | null>>;
  analytics: boolean;
  setHidePropertyHoldings: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchPropertyCard: React.FC<PropertyCardProps> = ({
  zp_id,
  zip,
  image,
  price,
  sqft,
  baths,
  beds,
  address,
  setShowAnalytics,
  handleAnalytics = () => {}, // Default function if not provided
  userEmail,
  setAnalyzedPropertyId,
  setAnalyzedPropertyZip,
  analytics,
  setHidePropertyHoldings,
}) => {
  const router = useRouter();

  //add to watchlist
  const addToWatchlist = async() => {


      //push to database 'property_holdings'
      if (userEmail) {
        await axios.post("/api/addWatchlist", {
          zp_id,
          userEmail,
        });
        toast("Watchlist Update", {
          description: "Your NexBrick Property Watchlist has been updated.",
          duration: 5000,
        });
      } else {
        toast.error("Please log in to add to your watchlist.");
        return;
      }
  }

  //claim holding
  const claimHolding = async() => {

      //push to database 'property_holdings'
      if (userEmail) {
        await axios.post("/api/addHoldings", {
          zp_id,
          userEmail,
        });
        toast("Property Holdings Update", {
          description: "Your NexBrick Property Holdings have been updated.",
          duration: 5000,
        });
      }
      else {
        toast.error("Please log in to claim your holding.");
        return;
      }
    }
  return (
    <div
      key={zp_id}
      className=" relative z-20 min-w-[10em] bg-gray-100 rounded-2xl shadow-lg overflow-hidden border-r-2 border-b-1 border-gray-400/50"
    >

      <div className="relative">
        <img src={image} alt="Property" className="w-full h-48 object-cover" />

        <DropdownMenu>
          <DropdownMenuTrigger className="absolute top-2 right-2">
            <div  className="rounded-full p-1 shadow-md bg-white/70">
              <BsThreeDotsVertical className="text-primary" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-100 text-primary shadow-lg border-none">
            <DropdownMenuItem
            onClick={() => {
              addToWatchlist();
            }
            }
            >
              <IoEye className="w-4 h-4 text-primary" />
              Add to Watchlist
              </DropdownMenuItem>
            <DropdownMenuItem
            onClick={() => {
              claimHolding();
            }
            }
            >
              <FaHouseDamage className="w-4 h-4 text-primary" />
              Claim Your Holding
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="p-4 relative z-50">
        <h3
          className="text-2xl font-bold tracking-tighter"
          style={{
            background: "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
        >
          {price}
        </h3>
        <p className="text-primary text-[14px]">
          {sqft} sqft • {baths} baths • {beds} beds
        </p>
        <p className="text-gray-400 text-[14px]">{address}</p>
        {
          analytics ? (
            <div className="grid grid-cols-2 gap-2">
              <button
              className="hover:cursor-pointer relative w-full text-[14px] font-extralight tracking-tight mt-2 flex items-center justify-center gap-2 p-2 rounded-lg text-center shadow-lg border-t-[1.5px] border-l-[1.5px] border-r-[0.3px] border-b-[0.3px] border-l-gray-500/70 border-t-gray-400/70 border-r-gray-600/70 border-b-gray-600/70"
              onClick={() => {
                setShowAnalytics(true);
                setAnalyzedPropertyId(zp_id);
                setAnalyzedPropertyZip(zip);
                handleAnalytics();
                setHidePropertyHoldings(true);
              }}
            >
                            <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
              <ChartNoAxesCombined className="w-4 h-4" />
              <p> Analytics</p>
            </button>
   
            <button
              className="hover:cursor-pointer relative w-full text-[14px] font-extralight tracking-tight mt-2 flex items-center justify-center  gap-2 p-2 rounded-lg text-center shadow-lg border-t-[1.5px] border-l-[1.5px] border-r-[0.3px] border-b-[0.3px] border-l-gray-500/70 border-t-gray-400/70 border-r-gray-600/70 border-b-gray-600/70"
              onClick={() => {
                router.push(`/reports/${zp_id}`);
              }}
            >
                                          <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
              <IoDocumentText className="w-4 h-4" />
              <p> Reports</p>
            </button>
          </div>
          ):(
            <button
            className="hover:cursor-pointer relative w-full text-[14px] font-extralight tracking-tight mt-2 flex space-x-2 items-center justify-center p-2 rounded-lg text-center shadow-lg border-t-[1.5px] border-l-[1.5px] border-r-[0.3px] border-b-[0.3px] border-l-gray-500/70 border-t-gray-400/70 border-r-gray-600/70 border-b-gray-600/70"
            onClick={() => {
              router.push(`/reports/${zp_id}`);
            }}
          >
                                                      <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
            <IoDocumentText className="w-4 h-4" />
            <p> Reports</p>
          </button>
          )
        }

      </div>
    </div>
  );
};

export default SearchPropertyCard;

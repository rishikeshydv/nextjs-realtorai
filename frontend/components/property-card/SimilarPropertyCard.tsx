"use client";

import React from "react";
import { BsPinAngleFill } from "react-icons/bs";;
import { GoGitCompare } from "react-icons/go";
import { GlowingEffect } from "@/components/ui/glowing-effect";
interface PropertyCardProps {
  zp_id: string;
  image: string;
  price: string;
  sqft: string;
  baths: number;
  beds: number;
  address: string;
  comparedPropertyId?: string;
  setComparedPropertyId?: React.Dispatch<React.SetStateAction<string>>;
}

const SimilarPropertyCard: React.FC<PropertyCardProps> = ({
  zp_id,
  image,
  price,
  sqft,
  baths,
  beds,
  address,
  comparedPropertyId,
  setComparedPropertyId,
}) => {
  return (
    <div
    key={zp_id}
      className=" relative z-20 min-w-[10em] bg-gray-100 rounded-2xl shadow-lg overflow-hidden border-r-2 border-b-1 border-gray-400/50"
    >
      <div className="relative">
        <img src={image} alt="Property" className="w-full h-48 object-cover" />
        <button className="absolute top-2 left-2 rounded-full p-1 shadow-md bg-white">
          <BsPinAngleFill className="text-gray-500" />
        </button>
      </div>
      <div className="p-4">
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
        <button
          className="hover:cursor-pointer relative w-full text-[14px] font-extralight tracking-tight mt-2 flex gap-2 items-center justify-center p-2 rounded-lg text-center shadow-lg border-t-[1.5px] border-l-[1.5px] border-r-[0.3px] border-b-[0.3px] border-l-gray-500/70 border-t-gray-400/70 border-r-gray-600/70 border-b-gray-600/70"
          onClick={()=>{
            if (setComparedPropertyId) {
              if (comparedPropertyId === zp_id) {
                setComparedPropertyId("");
              } else {
                setComparedPropertyId(zp_id);
              }
            }
          }}
        >
                                                    <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
          <GoGitCompare className="w-4 h-4"/>
          <p> {
            comparedPropertyId === zp_id ?
            "Undo Compare" :
            "Compare"
            }</p>
        </button>

      </div>
    </div>
  );
};

export default SimilarPropertyCard;

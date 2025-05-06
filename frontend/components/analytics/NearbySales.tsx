"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

interface NearbyProperty {
    image: string;
    address: string;
    sale_price: string;
    sale_date: string;
    distance: string;
    beds: string;
    baths: string;
    sqft: string;
    year_built: string;
  }

export default function NearbySales({
analyzedPropertyId
}: {
analyzedPropertyId: string;
}) {

  //dummy data
  const [nearbySales,setNearbySales] = useState<NearbyProperty[]>([])
  const priceFormatter = (value: string): string => {
    const numberValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    if (isNaN(numberValue)) return value;
    return `$${numberValue.toLocaleString()}`;
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.post("/api/get-nearby-sales", {
        zp_id: analyzedPropertyId,
      });
      const data = response.data.nearby_sales;
      // Format the data
      const formattedData = data.map((property: NearbyProperty) => ({
        ...property,
        sale_price: priceFormatter(property.sale_price),
        distance: property.distance ? (property.distance).slice(0,5) : "N/A",
      }));
      setNearbySales(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!analyzedPropertyId) return;
    fetchData();
  },[analyzedPropertyId]);
  


  return (
<div className=" rounded-xl w-full">
      <h1
    className="text-[20px] tracking-tight"
    style={{
        background:
        "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block",
    }}
      >
        Off Market Sales    
      </h1>
      <div className="border rounded-lg overflow-hidden my-6 mx-4">
        <div className="overflow-x-auto ">
          <div className="max-h-[400px] overflow-y-auto ">
            <Table className="">
              <TableHeader>
                <TableRow className="bg-[#1a1d2410] border border-[#15171c] shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
                  <TableHead className="border-r-1 border-gray-400/10 text-center font-semibold text-[15px] tracking-wide">
                    Name
                  </TableHead>
                  <TableHead className="border-r-1 border-gray-400/10 text-center hover:cursor-wait font-semibold text-[15px] tracking-wide">
                    Beds
                  </TableHead>
                  <TableHead className="border-r-1 border-gray-400/10 text-center hover:cursor-wait font-semibold text-[15px] tracking-wide">
                    Baths
                  </TableHead>
                  <TableHead className="border-r-1 border-gray-400/10 text-center hover:cursor-wait font-semibold text-[15px] tracking-wide">
                    Sqft
                  </TableHead>
                  <TableHead className="text-center font-semibold text-[15px] tracking-wide">
                    Year Built
                  </TableHead>
                  <TableHead className="border-r-1 border-gray-400/10 text-center  hover:cursor-wait font-semibold text-[15px] tracking-wide">
                    Distance
                  </TableHead>
                  <TableHead className="border-r-1 border-gray-400/10 text-center hover:cursor-wait  font-semibold text-[15px] tracking-wide">
                  Sale Price
                  </TableHead>
                  <TableHead className="border-r-1 border-gray-400/10 text-center hover:cursor-wait font-semibold text-[15px] tracking-wide">
                    Sale Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nearbySales.map((property,index) => (
                  <TableRow
                    key={index}
                    className="border border-[#15171c] shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]"
                  >
                    <TableCell className="text-[14px] text-gray-400/90 w-6">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-sm  flex justify-center items-center">
                          <img
                            src={property.image || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-8 -8 40 40' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-image'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E`}
                            alt={property.address}
                            className="object-cover rounded-md"
                          />
                        </div>
                        <span className="font-medium">{property.address.trim()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-gray-400/90">{property.beds}</TableCell>
                    <TableCell className="text-center text-gray-400/90">{property.baths}</TableCell>
                    <TableCell className="text-center text-gray-400/90">{Number(property.sqft).toLocaleString()} sqft</TableCell>
                    <TableCell className="text-center text-gray-400/90">{property.year_built}</TableCell>
                    <TableCell className="text-center text-gray-400/90">{property.distance} ft</TableCell>
                    <TableCell className="text-center text-gray-400/90">{property.sale_price}</TableCell>
                    <TableCell className="text-center text-gray-400/90">{property.sale_date}</TableCell>
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

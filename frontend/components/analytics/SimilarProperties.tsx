"use client";
import React, {useState} from "react";
import { AnalyticsMenu } from "../analytics/AnalyticsMenu";
import CompareUI from "../comparative-analysis/CompareUI";
import SimilarPropertyCard from "../property-card/SimilarPropertyCard";
import NearbySales from "@/components/analytics/NearbySales";
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react";
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

export default function SimilarProperties({
  analyticsCategory,
  setAnalyticsCategory,
  analyticsPropertyId,
  comparedPropertyId,
  setComparedPropertyId,
}: {
  analyticsCategory: string;
  setAnalyticsCategory: React.Dispatch<React.SetStateAction<string>>;
  analyticsPropertyId: string;
  comparedPropertyId: string;
  setComparedPropertyId: React.Dispatch<React.SetStateAction<string>>;
}) {

  const [properties, setProperties] = React.useState<ReturnPropertyDetails[]>(
    []
  );
      const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  React.useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch("/api/get-similar-properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ zp_id: analyticsPropertyId }),
      });
      const data = await response.json();
      setProperties(data.properties);
    };

    fetchProperties();
  }, [analyticsPropertyId]);



      //logic for pagination
      const [currentPage, setCurrentPage] = React.useState(1)
      const itemsPerPage = 4
      const totalPages = Math.ceil(properties.length / itemsPerPage)
  
      const indexOfLastProperty = currentPage * itemsPerPage
      const indexOfFirstProperty = indexOfLastProperty - itemsPerPage
      const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty)


  return (
    <div className="py-4 pl-4 pr-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-2 lg:col-span-1">
          <div className="h-full rounded-lg shadow-none px-4">
            <AnalyticsMenu
              analyticsCategory={analyticsCategory}
              setAnalyticsCategory={setAnalyticsCategory}
              zp_id={analyticsPropertyId || ""}
            />
          </div>
        </div>
        <div className="md:col-span-10 lg:col-span-11">
        <div className=" px-4 py-4 bg-[#437a4520] rounded-xl">
      <NearbySales analyzedPropertyId={analyticsPropertyId} />
        </div>
        <div className=" px-4 py-4 bg-[#437a4520] rounded-xl mt-4">
          <div
            className="text-[20px] tracking-tight"
            style={{
              background:
                "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Similar Properties
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 my-6">
            {currentProperties.map((property, index) => (
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
                 <SimilarPropertyCard
               image={property.details.image} price={property.details.price} sqft={property.details.sqft.toLocaleString()} baths={property.details.baths} beds={property.details.beds} address={property.details.address} key={index}
                {...property}
                comparedPropertyId={comparedPropertyId}
                setComparedPropertyId={setComparedPropertyId}             
              />
              </div>
            ))}
          </div>
             {/* Pagination Controls */}
                        {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 my-6">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
            
                      {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                        // Show first 3, last 3, and current page with neighbors
                        let pageNum
                        if (totalPages <= 7) {
                          pageNum = i + 1
                        } else if (i < 3) {
                          pageNum = i + 1
                        } else if (i >= 4) {
                          pageNum = totalPages - (6 - i)
                        } else {
                          // This is the middle ellipsis
                          return (
                            <span key="ellipsis" className="px-2">
                              ...
                            </span>
                          )
                        }
            
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className="min-w-[2rem]"
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
            
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
        </div>
        {
          //if the comparedPropertyId is not empty, show the CompareUI
          comparedPropertyId !== "" && (
            <div className=" px-4 py-4 bg-[#437a4520] rounded-xl mt-4">
            <CompareUI analyzedPropertyId={analyticsPropertyId} comparedPropertyId={comparedPropertyId}/>
          </div>
          )
        }

      </div>
    </div>
</div>
  );
}

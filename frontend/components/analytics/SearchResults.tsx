"use client";
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, {useState} from "react";
import SearchPropertyCard from "../property-card/SearchResultsCard";
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

interface ReturnPropertyDetails{
  zp_id: string;
  details: PropertyDetails;
  qualify: boolean
}
export default function SearchResults({
  userEmail,
  setShowAnalytics,
  handleAnalytics,
  searchResults,
  setAnalyzedPropertyId,
  setAnalyzedPropertyZip,
  analytics,
  setHidePropertyHoldings
}: {
  userEmail: string,
  setShowAnalytics: React.Dispatch<React.SetStateAction<boolean>>,
  handleAnalytics: () => void,
  searchResults: ReturnPropertyDetails[],
  setAnalyzedPropertyId: React.Dispatch<React.SetStateAction<string | null>>
  setAnalyzedPropertyZip: React.Dispatch<React.SetStateAction<string | null>>
  analytics: boolean
  setHidePropertyHoldings: React.Dispatch<React.SetStateAction<boolean>>
}) {


    //logic for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 16 // 4 columns x 4 rows
    const totalPages = Math.ceil(searchResults.length / itemsPerPage)

    const indexOfLastProperty = currentPage * itemsPerPage
    const indexOfFirstProperty = indexOfLastProperty - itemsPerPage
    const currentProperties = searchResults.slice(indexOfFirstProperty, indexOfLastProperty)
  
         const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <div className="px-4 py-4 bg-[#437a4520] rounded-xl mb-6">
      <div
        className="text-[20px] tracking-tight"
        style={{
          background: "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
        Search Results
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 my-6">
        {currentProperties.map((property, index) => (
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

        <SearchPropertyCard 
          key={index} 
          userEmail={userEmail}
          {...property.details} 
          sqft={property.details.sqft.toString()} 
          setShowAnalytics={setShowAnalytics} 
          handleAnalytics={handleAnalytics}
          setAnalyzedPropertyId={setAnalyzedPropertyId}
          setAnalyzedPropertyZip={setAnalyzedPropertyZip}
          analytics={analytics}
          setHidePropertyHoldings={setHidePropertyHoldings}
          />

          </div>
        ))}
      </div>

            {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4">
          <div>
            Page {currentPage} of {totalPages}  
          </div>
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

        </div>
      )}

    </div>
  );
}

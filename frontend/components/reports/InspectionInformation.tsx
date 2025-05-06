"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, AlertTriangle, FileText } from "lucide-react"
import { GrUserPolice } from "react-icons/gr";

interface InspectionData {
  date: string
  result: string
  inspectorName: string
  comments: string
}

export default function InspectionInformation({inspections}:{inspections: InspectionData[]}) {
  const [filter, setFilter] = useState("all")

  // Filter inspections based on selected filter
  const filteredInspections =
  filter === "all"
    ? inspections
    : filter === "passed"
    ? inspections.filter(
        (inspection) => inspection.result.toLowerCase() === "passed"
      )
    : filter === "failed"
    ? inspections.filter(
        (inspection) => inspection.result.toLowerCase() === "failed"
      )
    : filter === "others"
    ? inspections.filter(
        (inspection) =>
          inspection.result.toLowerCase() !== "passed" &&
          inspection.result.toLowerCase() !== "failed"
      )
    : inspections; // Add a default case in case of unexpected filter values
    //titleCase the string
    function toTitleCase(input: string): string {
      if (!input) {
        return "";
      }
    
      return input
        .toLowerCase() // Convert to lowercase first to ensure consistent capitalization
        .split(" ") // Split the string into words based on spaces
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(" "); // Join the words back with spaces
    }
      

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-end items-end md:items-center mb-8 gap-4">
        <div className="w-full md:w-auto">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by result" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Results</SelectItem>
              <SelectItem value="passed">Passed</SelectItem>
              <SelectItem value="failed">Fail</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1">
        {filteredInspections.length > 0 ? (
          filteredInspections.map((inspection, index) => (
            <div key={index} className="relative">
              {/* Timeline connector */}
              {index < filteredInspections.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
              )}

              <div className="flex gap-4 p-4 relative">
                {/* Timeline node with icon */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center z-10 border-2 border-white dark:border-gray-800"
                  style={{ backgroundColor: getResultColor(inspection.result).bgColor }}
                >
                  {getResultIcon(inspection.result)}
                </div>

                {/* Content */}
                <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow border-l-4 border-[#4a3a80]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold" style={{ color: getResultColor(inspection.result).textColor }}>
                        {
                        inspection.result }
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(inspection.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <GrUserPolice className="h-3.5 w-3.5" />
                      <span>{toTitleCase(inspection.inspectorName)}</span>
                    </div>
                  </div>

                  <div className="mt-2 text-sm">
                    <div className="flex items-start gap-1">
                      <FileText className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <p>{
                        inspection.comments.length > 0 ?
                        toTitleCase(inspection.comments) :
                        "No comments provided."
                        }</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-muted-foreground">No inspections found with this result.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to get result color
function getResultColor(result: string) {
  switch (result.toLowerCase()) {
    case "passed":
      return { bgColor: "#437A45", textColor: "#437A45" }
    case "failed":
        return { bgColor: "#437A45", textColor: "#437A45" }
    case "others":
        return { bgColor: "#437A45", textColor: "#437A45" }
    default:
        return { bgColor: "#437A45", textColor: "#437A45" }
  }
}

// Helper function to get result icon
function getResultIcon(result: string) {
  switch (result.toLowerCase()) {
    case "passed":
      return <CheckCircle className="h-6 w-6 text-white" />
    case "failed":
      return <XCircle className="h-6 w-6 text-white" />

    case "others":
      return <AlertTriangle className="h-6 w-6 text-white" />
    default:
      return <AlertTriangle className="h-6 w-6 text-white" />
  }
}

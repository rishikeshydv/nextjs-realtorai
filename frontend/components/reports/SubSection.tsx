"use client"
import React,{useState} from "react";

export default function SubSection({ currentState,setCurrentSubSection }: { currentState: string,setCurrentSubSection: React.Dispatch<React.SetStateAction<string>> }) {
    const [activeItem, setActiveItem] = useState("Key Information")
  const subSectionOptions: Record<string, string[]> = {
    ownership_info: [
      "Key Information",
      "Assessments",
      "Land Information",
      "Improvements",
      "Transfer History",
    ],
    tax_valuation: [],
    general_inspections: [],
    police_records: [],
    sex_offense_cases: [],
    demographic_records: [],
    walk_scores: [],
    climate_records: [],
  };
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 relative z-10">
      {subSectionOptions[currentState] &&
      subSectionOptions[currentState].length > 0 && (
        subSectionOptions[currentState].map((item, index) => (
          <div
            key={index}
            className="bg-[#437a4520] rounded-xl px-3 py-2 text-center text-[16px] border-r-1 border-gray-700 hover:cursor-pointer"
            onClick={
              ()=>{
                setActiveItem(item);
                setCurrentSubSection(item);
              }
            }

          >
            <div>{item}</div>
            {
                activeItem === item ? (
                  <div 
                  className="h-1 w-3/4 bg-[#437A45] mt-2 rounded-2xl flex justify-center items-center mx-auto"
                  ></div>
                ) : null
            }
          </div> 
        ))
      )}
    </div>
  );
}

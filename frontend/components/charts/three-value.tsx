"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
export default function ThreeValue({
  value1,
  value2,
  value3,
}:{
  value1: string;
  value2: string;
  value3: string;
}) {
  const [val1, setVal1] = useState("0");
  const [val1Denomination, setVal1Denomination] = useState("K");
  const [val2, setVal2] = useState("0");
  const [val2Denomination, setVal2Denomination] = useState("K");
  const [val3, setVal3] = useState("0");
  const [val3Denomination, setVal3Denomination] = useState("K");

  const parseValue = (value?: string | null) => {
    if (typeof value !== 'string') return null;
  
    const regex = /\$([\d,]+)(\.\d+K)/;
    const match = value.match(regex);
    if (!match) return null;
  
    const part1 = `$${match[1]}`; // e.g., $269
    const part2 = match[2];       // e.g., .3K
    return { part1, part2 };
  };
  
  
  useEffect(() => {
    const parseAndSet = (
      rawValue: string,
      setMain: (val: string) => void,
      setDenomination: (val: string) => void
    ) => {
      const parsed = parseValue(rawValue);
      if (parsed) {
        setMain(parsed.part1);
        setDenomination(parsed.part2);
      }
    };
  
    parseAndSet(value1, setVal1, setVal1Denomination);
    parseAndSet(value2, setVal2, setVal2Denomination);
    parseAndSet(value3, setVal3, setVal3Denomination);
  }, [value1, value2, value3]);
  

  return (
    <Card className="w-full bg-[#437a4520] text-white rounded-xl p-3 sm:p-4 md:p-6 shadow-xl  border-none outline-none">
      <div className="flex justify-left items-center mb-4 sm:mb-6 md:mb-8 space-x-2">
      <div className="flex justify-center items-center w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px] rounded-lg px-1 bg-gray-100/10  bg-[url(/bgs/button-bg.png)] shadow-lg border-2 sm:border-3 md:border-4 border-gray-300">
          <FaMoneyBillTransfer className="w-5 h-5 text-black" />
        </div>
        <h1
    className="text-base sm:text-lg md:text-[18px] font-semibold"
          style={{
            background: "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
        >
          Investment Metrics
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Total Revenue */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <div className="ml-2 sm:ml-4 md:ml-6 mb-[-1px]">
            <div className="text-gray-400 text-sm sm:text-base md:text-[18px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className=" hover:cursor-pointer">Return on Investment</TooltipTrigger>
                <TooltipContent>
                  <p>Return on Investment in 5 years calculated with BrickAI intelligence.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold text-primary">
          {val1 && val1 !== "0" ? val1 : "N/A"}
          <span className="text-gray-500">
            {val1 && val1 !== "0" && val1Denomination ? val1Denomination : ""}
          </span>
        </div>
          </div>
          <div className="grid grid-cols-20 gap-[2px] h-16 sm:h-20 md:h-24 items-end">
            {Array(20)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`revenue-${i}`}
                  className={`rounded-full bg-[#ffffff]/20 w-1 ${
                    i === 0 ? "h-[200%]" : "h-[90%]"
                  }`}
                ></div>
              ))}
          </div>
        </div>

        {/* Interviews */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <div className="ml-2 sm:ml-4 md:ml-6 mb-[-1px]">
            <div className="text-gray-400 text-sm sm:text-base md:text-[18px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className=" hover:cursor-pointer">After Repair Value</TooltipTrigger>
                <TooltipContent>
                 <p>BrickAI-powered After Repair Value includes mid-range bathroom & kitchen renovation.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold text-primary">
          {val2 && val2 !== "0" ? val2 : "N/A"}
          <span className="text-gray-500">
            {val2 && val2 !== "0" && val2Denomination ? val2Denomination : ""}
          </span>
        </div>
          </div>
          <div className="grid grid-cols-20 gap-[2px] h-16 sm:h-20 md:h-24 items-end">
            {Array(20)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`revenue-${i}`}
                  style={{
                    background:
                      "linear-gradient(to bottom, #D6D0F9 0%, #7159EA 100%)",
                  }}
                  className={`rounded-full w-1 ${
                    i === 0 ? "h-[200%]" : "h-[90%]"
                  }`}
                ></div>
              ))}
          </div>
        </div>

        {/* Income Tracker */}
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          <div className="ml-2 sm:ml-4 md:ml-6 mb-[-1px]">
            <div className="text-gray-400 text-sm sm:text-base md:text-[18px]">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className=" hover:cursor-pointer">Avg. Monthly Mortgage</TooltipTrigger>
                <TooltipContent>
                 <p>Est. Credit Score Over 740</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold text-primary">
          {val3 && val3 !== "0" ? val3 : "N/A"}
          <span className="text-gray-500">
            {val3 && val3 !== "0" && val3Denomination ? val3Denomination : ""}
          </span>
        </div>
          </div>
          <div className="grid grid-cols-20 gap-[2px] h-16 sm:h-20 md:h-24 items-end">
            {Array(20)
              .fill(0)
              .map((_, i) => (
                <div
                  key={`revenue-${i}`}
                  style={{
                    background:
                      "linear-gradient(to bottom, #1CADE2 0%, #0F5F7C 100%)",
                  }}
                  className={`rounded-full w-1 ${
                    i === 0 ? "h-[200%]" : "h-[90%]"
                  }`}
                ></div>
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

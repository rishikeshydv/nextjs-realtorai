"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, Droplets, Wind, Cloud, Thermometer } from "lucide-react"
import { AnimatePresence, motion } from "motion/react";
interface Rating {
  fire: string
  flood: string
  wind: string
  air: string
  heat: string
}

export default function ClimateInformation({data}: {data: Rating}) {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const ConvertRating = (input:string):number => {
    const parts = input.split("/");
    if (parts.length !== 2) {
      console.error("Invalid input format");
      return 0;
    }
    const numerator = parseInt(parts[0], 10);
    return isNaN(numerator) ? 0 : numerator*10;
  }
  const ratings = [
    {
      element: "Fire",
      rating: (data && data.fire) ? data.fire : "1/10",
      description: "Combustion risk assessment",
      icon: Flame,
      color: "text-white",
      bgColor: "bg-[#437A45]",
    },
    {
      element: "Flood",
      rating: (data && data.flood) ? data.flood : "1/10",
      description: "Water damage potential",
      icon: Droplets,
      color: "text-white",
      bgColor: "bg-[#437A45]",
    },
    {
      element: "Wind",
      rating: (data && data.wind) ? data.wind : "1/10",
      description: "Airflow intensity measure",
      icon: Wind,
      color: "text-white",
      bgColor: "bg-[#437A45]",
    },
    {
      element: "Air",
      rating: (data && data.air) ? data.air : "1/10",
      description: "Atmospheric quality index",
      icon: Cloud,
      color: "text-white",
      bgColor: "bg-[#437A45]",
    },
    {
      element: "Heat",
      rating: (data && data.heat) ? data.heat : "1/10",
      description: "Thermal intensity scale",
      icon: Thermometer,
      color: "text-white",
      bgColor: "bg-[#437A45]",
    },
  ]

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ratings.map((item, index) => (
        <div
        key={index}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="relative group block"
        >
                  
                                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-slate-400/30 block  rounded-3xl"
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
                    <Card
            key={item.element}
            className="overflow-hidden border-l-4 border-[#4a3a80] bg-[#437a4520]"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className={`p-2 rounded-full ${item.bgColor}`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  {item.element}
                </CardTitle>
                <div className="rounded-full bg-[#437A45] w-8 h-8 p-1 flex items-center justify-center">
                <span className={`text-[12px] font-extralight ${item.color}`}>{item.rating}</span>
                </div>
              </div>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                           <div className="relative h-2 mb-2 w-full overflow-hidden rounded-full bg-gray-300">
                <div
                  className="h-full"
                  style={{
                    width: `${ConvertRating(item.rating)}%`,
                    borderRadius: "4px",
                    background: "linear-gradient(to right, #D5C5FF, #B19CFF, #8C78FF)",
                  }}
                />
              </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        ))}
      </div>
    </div>
  )
}

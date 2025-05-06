"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import { AnimatePresence, motion } from "motion/react";
interface AssessmentData {
  totalAssessedValue: string;
  fullMarketValue: string;
  totalLandValue: string;
  countyTaxableValue: string;
  townTaxableValue: string;
  schoolTaxableValue: string;
  villageTaxableValue: string;
  assessmentLevel: string;
  equalizationRate: string;
}

export default function AssessmentInformation({
  data,
}: {
  data: AssessmentData;
}) {
  // Sample data - in a real application, this would come from an API or props
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  return (
    <div className="w-full bg-transparent">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-center p-6">
          <TabsList className="grid grid-cols-3 w-full gap-2 bg-[#437a4520]">
            <TabsTrigger value="all" className="w-full text-[16px]">
              All Values
            </TabsTrigger>
            <TabsTrigger value="assessed" className="w-full text-[16px]">
              Assessment Values
            </TabsTrigger>
            <TabsTrigger value="taxable" className="w-full text-[16px]">
              Taxable Values
            </TabsTrigger>
          </TabsList>
        </div>
        <Separator className="mt-[-16px] mb-[10px]" />
        <TabsContent value="all" className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries({
              "Total Assessed Value": data.totalAssessedValue,
              "Full Market Value": data.fullMarketValue,
              "Total Land Value": data.totalLandValue,
              "County Taxable Value": data.countyTaxableValue,
              "Town Taxable Value": data.townTaxableValue,
              "School Taxable Value": data.schoolTaxableValue,
              "Village Taxable Value": data.villageTaxableValue,
              "Assessment Level": data.assessmentLevel,
              "Equalization Rate": data.equalizationRate,
            }).map(([label, value]) => (
              <div
                key={label}
                onMouseEnter={() => setHoveredIndex(label)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group block"
              >
                                <AnimatePresence>
                  {hoveredIndex === label && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-[#8fbc8b]/30 block rounded-3xl"
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
                key={label}
                className="overflow-hidden border-l-4 border-[#4a3a80] bg-[#437a4520]"
              >
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">{label}</div>
                  <div
                    className="text-2xl font-bold mt-1"
                    style={{
                      background:
                        "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "inline-block",
                    }}
                  >
                    {value}
                  </div>
                </CardContent>
              </Card>
                </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assessed" className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries({
              "Total Assessed Value": data.totalAssessedValue,
              "Full Market Value": data.fullMarketValue,
              "Total Land Value": data.totalLandValue,
              "Assessment Level": data.assessmentLevel,
              "Equalization Rate": data.equalizationRate,
            }).map(([label, value]) => (
              <div
                key={label}
                onMouseEnter={() => setHoveredIndex(label)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group block"
              >
                <AnimatePresence>
                  {hoveredIndex === label && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-[#8fbc8b]/30 block  rounded-3xl"
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
                  key={label}
                  className="overflow-hidden border-l-4 border-[#4a3a80] bg-[#437a4520]"
                >
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">{label}</div>
                    <div
                      className="text-2xl font-bold mt-1"
                      style={{
                        background:
                          "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                      }}
                    >
                      {value}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="taxable" className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries({
              "County Taxable Value": data.countyTaxableValue,
              "Town Taxable Value": data.townTaxableValue,
              "School Taxable Value": data.schoolTaxableValue,
              "Village Taxable Value": data.villageTaxableValue,
            }).map(([label, value]) => (
              <div
              key={label}
              onMouseEnter={() => setHoveredIndex(label)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group block"
              >
                                <AnimatePresence>
                  {hoveredIndex === label && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-[#8fbc8b]/30 block  rounded-3xl"
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
                key={label}
                className="overflow-hidden border-l-4 border-[#4a3a80] bg-[#437a4520]"
              >
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">{label}</div>
                  <div
                    className="text-2xl font-bold mt-1"
                    style={{
                      background:
                        "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "inline-block",
                    }}
                  >
                    {value}
                  </div>
                </CardContent>
              </Card>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end items-end text-sm text-muted-foreground">
        <p className="p-2">Tax Year: 2025</p>
      </div>
    </div>
  );
}

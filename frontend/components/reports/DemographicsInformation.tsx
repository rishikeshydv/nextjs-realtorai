"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserIcon as Male, UserIcon as Female } from "lucide-react"


interface PopulationData {
    totalPopulation: number
    malePopulation: number
    femalePopulation: number
    ethnicityBreakdown: Array<{
        name: string
        value: number 
        color: string
    }>
    citizenPopulation: {
        total: number
        male: number
        female: number
    }
}

export default function DemographicsInformation({data}:{data:PopulationData}) {
  const [activeTab, setActiveTab] = useState("overview")
  console.log("Active Tab:", activeTab)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <div className="flex items-center justify-center p-6">
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-[#437a4520]">
          <TabsTrigger value="overview"  className="w-full text-[16px]">Overview</TabsTrigger>
          <TabsTrigger value="ethnicity"  className="w-full text-[16px]">Ethnicity</TabsTrigger>
          <TabsTrigger value="citizens"  className="w-full text-[16px]">Citizens</TabsTrigger>
        </TabsList>
        </div>
        <TabsContent value="overview" className="space-y-6 px-6">
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle
              className="text-[20px]"
                style={{
                    background:
                    "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                }}
              >Total Population</CardTitle>
              <CardDescription>Buffalo, NY Population Statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Population</span>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold"
                style={{
                    background:
                        "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    }}
                  >{data.totalPopulation.toLocaleString()}</div>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Male Population</span>
                    <Male className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold"
                style={{
                    background:
                        "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    }}
                  >{data.malePopulation.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    {((data.malePopulation / data.totalPopulation) * 100).toFixed(1)}% of total
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Female Population</span>
                    <Female className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold"
                style={{
                    background:
                        "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    }}
                  >{data.femalePopulation.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    {((data.femalePopulation / data.totalPopulation) * 100).toFixed(1)}% of total
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Male</span>
                  <span className="text-sm">Female</span>
                </div>
                <div className="flex w-full h-4 rounded-full overflow-hidden">
                  <div
                    style={{ 
                        width: `${(data.malePopulation / data.totalPopulation) * 100}%`, 
                        background: "linear-gradient(to right, #0ea5e9, #38bdf8, #67e8f9)"
                    }}
                  ></div>
                  <div
                    style={{ 
                        width: `${(data.femalePopulation / data.totalPopulation) * 100}%`,
                          background: "linear-gradient(to right, #D5C5FF, #B19CFF,#8C78FF)"
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs">
                    {((data.malePopulation / data.totalPopulation) * 100).toFixed(1)}%
                  </span>
                  <span className="text-xs">
                    {((data.femalePopulation / data.totalPopulation) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ethnicity" className="space-y-6 px-6">
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle 
              className="text-[20px]"
              style={{
                background:
                  "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
              >Ethnicity Breakdown</CardTitle>
              <CardDescription>Population by racial and ethnic groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {data.ethnicityBreakdown.map((ethnicity, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-[16px]">{ethnicity.name}</span>
                      <span>{ethnicity.value.toLocaleString()}</span>
                    </div>
                    <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        style={{
                          width: `${(ethnicity.value / data.totalPopulation) * 100}%`,
                          borderRadius: "4px",
                          background: "linear-gradient(to right, #D5C5FF, #B19CFF,#8C78FF)"
                        }}
                      ></div>
                    </div>
                    <div className="text-xs text-right">
                      {((ethnicity.value / data.totalPopulation) * 100).toFixed(2)}% of total population
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="citizens" className="space-y-6  px-6">
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle className="text-[20px]"
            style={{
                background:
                    "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                }}
              >Citizen Population (18+)</CardTitle>
              <CardDescription>Adult citizens eligible to vote</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Citizens (18+)</span>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold"
                    style={{
                        background:
                            "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                        }}
                  >{data.citizenPopulation.total.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    {((data.citizenPopulation.total / data.totalPopulation) * 100).toFixed(1)}% of
                    total population
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Male Citizens (18+)</span>
                    <Male className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold"
                    style={{
                        background:
                            "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                        }}
                  >{data.citizenPopulation.male.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    {((data.citizenPopulation.male / data.citizenPopulation.total) * 100).toFixed(
                      1,
                    )}
                    % of adult citizens
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Female Citizens (18+)</span>
                    <Female className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-2xl font-bold"
                style={{
                    background:
                        "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    }}
                  >{data.citizenPopulation.female.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    {((data.citizenPopulation.female / data.citizenPopulation.total) * 100).toFixed(
                      1,
                    )}
                    % of adult citizens
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

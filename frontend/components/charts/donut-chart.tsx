"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface GenderData{
  male_population: number;
  female_population: number;
}

export default function DonutChart({data}:{data:GenderData}) {

  const chartData = React.useMemo(() => [
    { gender: "male", value: parseInt(data.male_population.toString() || "50"), fill:"#437A45" },
    { gender: "female", value: parseInt(data.female_population.toString() || "50"), fill:"#8fbc8b" },
  ], [data.male_population, data.female_population])

  const genderChartConfig = {
    male : {
      label:"Male",
      color:"#437A45",
    },
    female : {
      label:"Female",
      color:"#8fbc8b",
    },

  } satisfies ChartConfig

  const id = "Gender Data"
  const [activeGender, setActiveGender] = React.useState(() => chartData[0]?.gender || "male");

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.gender === activeGender),
    [activeGender, chartData]
  )
  const genders = React.useMemo(() => chartData.map((item) => item.gender), [chartData])

  return (
    <Card data-chart={id} className=" bg-[#437a4520] w-full  border-none outline-none">
      <ChartStyle id={id} config={genderChartConfig} />
      <CardHeader className="flex items-end justify-end pb-0 mt-[-20px]">

  {/* Right: Dropdown */}
  <Select value={activeGender} onValueChange={setActiveGender}>
    <SelectTrigger
      className="h-7 w-[130px] rounded-lg pl-2.5"
      aria-label="Select a value"
    >
      <SelectValue placeholder="Select month" />
    </SelectTrigger>
    <SelectContent align="end" className="rounded-xl">
      {genders.map((key) => {
        const config = genderChartConfig[key as keyof typeof genderChartConfig]
        if (!config) return null
        return (
          <SelectItem
            key={key}
            value={key}
            className="rounded-lg [&_span]:flex"
          >
            <div className="flex items-center gap-2 text-xs">
              <span
                className="flex h-3 w-3 shrink-0 rounded-sm"
                style={{
                  backgroundColor:
                    genderChartConfig[key as keyof typeof genderChartConfig]?.color,
                }}
              />
              {config?.label}
            </div>
          </SelectItem>
        )
      })}
    </SelectContent>
  </Select>
</CardHeader>

      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={genderChartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="gender"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10}
                  />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-primary text-3xl font-bold"
                        >
                          {chartData[activeIndex].value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Population
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

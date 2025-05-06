"use client"

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { FaPercentage } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"


const chartConfig = {
  Values: {
    label: "Value",
  },
  safari: {
    label: "Safari",
  },
} satisfies ChartConfig

export default function RadialChart({title, value, subtext}: {title?: string, value: number,subtext?: string}) {
      const chartData = [
        { browser: "safari", value: value, fill: "#437A45" },
      ]
  return (
    <Card className=" bg-[#437a4520]  border-none outline-none">
      <CardHeader className=" pb-0">
        <CardTitle 
        className="text-[18px] flex items-center gap-2 px-0">
      <div className=" flex justify-center items-center w-[40px] h-[40px] rounded-lg  px-1 bg-[url(/bgs/button-bg.png)] bg-gray-100/10 shadow-lg border-4 border-gray-300">
        <FaPercentage className="w-5 h-5 text-white" />
      </div>
      <span
        className="text-gray-400 font-semibold text-[20px]"
        style={{
          background:
            "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
      >
        {title}
      </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-full"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={value*3.75}
            innerRadius={80}
            outerRadius={140}
            
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}

            />
            <RadialBar dataKey="value" background/>
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {subtext}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

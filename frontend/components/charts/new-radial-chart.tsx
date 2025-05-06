"use client"

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import {
  Card,
  CardContent,
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

export default function NewRadialChart({ value, subtext}: {title?: string, value: number,subtext?: string}) {
      const chartData = [
        { browser: "safari", value: value, fill: "#437A45" },
      ]
  return (
    <Card className=" bg-[#437a4520] w-full border-none outline-none">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square h-full mx-auto max-w-[500px] w-full"
        >
          <RadialBarChart
            data={chartData}
            endAngle={value*3.75}
            innerRadius={80}
            outerRadius={140}
            
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-[#000000]/10 last:fill-[#ffffff]/50"
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
                          className="fill-primary text-[48px] font-bold"
                        >
                          {chartData[0].value.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-[20px]"
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

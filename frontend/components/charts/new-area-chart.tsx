"use client"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import axios from "axios"
import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"


const chartConfig = {
  market: {
    label: "Market Value",
    color: "hsl(var(--chart-1))",
  },
  tax: {
    label: "Tax Value Paid",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function NewAreaChart({analyzedPropertyId}: {analyzedPropertyId: string}) {
    const [chartData, setChartData] = useState([
        { year: "2019", market: 186, tax: 80 },
        { year: "2020", market: 305, tax: 200 },
        { year: "2021", market: 237, tax: 120 },
        { year: "2022", market: 73, tax: 190 },
        { year: "2023", market: 209, tax: 130 },
        { year: "2024", market: 214, tax: 140 },
      ])
    const safeParseFloat = (value: string): number => {
    if (!value) return 0;
    return parseFloat(value.replace(/[^0-9.-]+/g, ""));
    };
    useEffect(() => {   
        axios.post("/api/charts/valuation",{analyzedPropertyId}).then((response) => {
            const data = response.data.valuation;
            const formattedData = data.year.map((year: string, index: number) => ({
                year: year,
                market: safeParseFloat(data.market_value[index]),
                tax: safeParseFloat(data.tax_value_paid[index]),
            }));
            setChartData(formattedData);
        })
    },[analyzedPropertyId])
  return (
    <Card className="bg-[#437a4520] border-none outline-none">
      <CardHeader>
        <CardTitle
        className="text-[18px]"
        style={{
            background:
            "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
        }}
                >
                  Annual Market Value and Tax Paid</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}

          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}

            //   tickFormatter={(value) => value.slice(0, 1)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={-8}
              tickCount={6}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <svg>
            <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#437A45" stopOpacity={0.8} />
                <stop
                offset="95%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.1}
                />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#437A45" stopOpacity={0.8} />
                <stop
                offset="95%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.1}
                />
            </linearGradient>
            </defs>
            </svg>
                        <Area
              dataKey="tax"
              type="natural"
              fill="url(#fillMobile)"
              stroke="#1CADE2"
              strokeWidth={3}
              fillOpacity={0.8}
              stackId="a"
              strokeDasharray="5 5"
              activeDot={{
                r: 6,
                fill: "#1CADE2",
                stroke: "#fff",
                strokeWidth: 2,
            }}
            />
                                    <Area
            dataKey="market"
            type="natural"
            fill="url(#fillDesktop)"
            stroke="#437A45"
            strokeWidth={3}
            fillOpacity={0.8}
            stackId="a"
            strokeDasharray="5 5"
            activeDot={{
                r: 6,
                fill: "#437A45",
                stroke: "#fff",
                strokeWidth: 2,
            }}
            
            />
           <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

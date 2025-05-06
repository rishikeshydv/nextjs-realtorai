"use client";

import {
  Area,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  LabelList,
  ComposedChart,
} from "recharts";
import { TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AreaGraph() {
  // Sample data for the chart
  const data = [
    { month: "January", desktop: 186, mobile: 186 },
    { month: "February", desktop: 305, mobile: 305 },
    { month: "March", desktop: 237, mobile: 237 },
    { month: "April", desktop: 73, mobile: 73 },
    { month: "May", desktop: 209, mobile: 209 },
    { month: "June", desktop: 214, mobile: 214 },
  ];

  return (
    <Card className="bg-[#151A24]">
      <CardHeader>
        <CardTitle
        className="text-[18px]"
        style={{
          background:
            "linear-gradient(to bottom, #ffffff 14%, #a1a8b8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
        }}
        >
          Annual Market Value and Tax Paid
          </CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
<ChartContainer
      config={{
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
        mobile: {
          label: "Mobile",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="min-h-[350px] [&_.recharts-wrapper]:pb-10 [&_.recharts-legend-wrapper]:inset-x-0"
    >
      <ComposedChart
        accessibilityLayer
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip content={<ChartTooltipContent />} />
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
        </defs>
        </svg>
        {/* Area chart for desktop data */}
        <Area
          dataKey="desktop"
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

        {/* Line chart for mobile data */}
        <Line
          type="monotone"
          dataKey="mobile"
          stroke="#ffffff"
          strokeWidth={3}
          dot={{
            r: 10,
            fill: "#7159EA",
            strokeWidth: 2,
            stroke: "white",
          }}
          activeDot={{
            r: 7,
            fill: "#7159EA90",
            stroke: "var(--background)",
            strokeWidth: 2,
          }}
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Line>

        <ChartLegend content={<ChartLegendContent />} />
      </ComposedChart>
    </ChartContainer>

      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>

  );
}

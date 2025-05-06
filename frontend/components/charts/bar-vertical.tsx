"use client";
import { Bar, BarChart, CartesianGrid, XAxis, LabelList } from "recharts";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useId } from "react";
interface NeighborhoodData {
  shopping_mall: number;
  restaurant: number;
  bank: number;
  police: number;
  hospital: number;
  bus_station: number;
  train_station: number;
  airport: number;
}

export default function BarVertical({data}:{data: NeighborhoodData}) {
  const primaryGradientId = useId();
  const shadowId = useId();


        //neighourhood data
      const neighbourhoodData = React.useMemo(() => [
        {
          category: "Shopping Mall",
          value: parseInt(data.shopping_mall.toString() || "50"),
        },
        {
          category: "Restaurant",
          value: parseInt(data.restaurant.toString() || "50"),
        },
        {
          category: "Bank",
          value: parseInt(data.bank.toString() || "50"),
        },
        {
          category: "Police Station",
          value: parseInt(data.police.toString() || "50"),
        },
        {
          category: "Hospital",
          value: parseInt(data.hospital.toString() || "50"),
        },
        {
          category: "Transit",
          value: parseInt((data.bus_station+data.train_station+data.airport).toString() || "50"),
        }
  
        ],[data])
  
        //config
        const neigbourhoodConfig = {
          catgory: {
            label: "Category",
            color: "hsl(var(--chart-1))",
          },
          value:{
            label: "Count",
            color: "hsl(var(--chart-1))",
          }
        } satisfies ChartConfig


        //charts dimensions
        const [chartWidth, setChartWidth] = React.useState(0)
        const [barSize, setBarSize] = React.useState(30)

          // Update chart dimensions on window resize
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setBarSize(30)
      } else if (width < 768) {
        setBarSize(40)
      } else if (width < 1024) {
        setBarSize(50)
      } else {
        setBarSize(60)
      }

      // Set chart width based on container
      const container = document.getElementById("chart-container")
      if (container) {
        setChartWidth(container.clientWidth - 40) // Subtract padding
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return (
    <div className="w-full h-full">
      <Card className="bg-[#437a4520] p-3 sm:p-4 h-full flex flex-col">
        <svg className="w-0 h-0 absolute">
          <defs>
            <linearGradient id={primaryGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor="#437A45" stopOpacity={1.0} />
              <stop offset="95%" stopColor="#437A45" stopOpacity={0.03} />
            </linearGradient>

            <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="10" dy="10" stdDeviation="10" floodOpacity="0.6" floodColor="#8F87F1" />
            </filter>
          </defs>
        </svg>

        <CardHeader className="pb-2">
          <CardTitle
            style={{
              background: "linear-gradient(to bottom, #000000 14%, #a1a8b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
            className="text-[16px] sm:text-[18px] md:text-[18px]"
          >
            Neighbourhood Data
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex items-center justify-center p-0 sm:p-2" id="chart-container">
          <ChartContainer config={neigbourhoodConfig} className="w-full h-full">
            <BarChart
              accessibilityLayer
              data={neighbourhoodData}
              margin={{
                top: 20,
                right: 10,
                left: 10,
                bottom: 10,
              }}
              width={chartWidth || 300}
              height={chartWidth ? chartWidth * 0.6 : 200}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="category"
                tickLine={true}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: "#000000", fontSize: "12px" }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="value"
                fill={`url(#${primaryGradientId})`}
                radius={[10, 10, 0, 0]}
                filter={`url(#${shadowId})`}
                barSize={barSize}
              >
                <LabelList position="top" offset={12} fill="#000000" fontSize={12} formatter={(value: number) => `${value}`} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>

  );
}

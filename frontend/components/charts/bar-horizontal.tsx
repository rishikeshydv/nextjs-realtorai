
import React from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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
} from "@/components/ui/chart"
import { useId } from "react"


interface EthnicityData{
  white_population: number;
  black_population: number;
  asian_population: number;
  american_indian_alaska_native_population: number;
  native_hawaiian_pacific_islander_population: number;
  some_other_race_population: number;
}

export default function BarHorizontal({data}:{data:EthnicityData}) {
      const primaryGradientId = useId()
      const shadowId = useId()

      //ethnicity data
      const ethnicityData = React.useMemo(() => [
        {
          race: "White",
          value: parseInt(data.white_population.toString() || "50"),
        },
        {
          race: "Black",
          value: parseInt(data.black_population.toString() || "50"),
        },
        {
          race: "Asian",
          value: parseInt(data.asian_population.toString() || "50"),
        },
        {
          race: "American Indian",
          value: parseInt(data.american_indian_alaska_native_population.toString() || "50"),
        },
        {
          race: "Native Hawaiian",
          value: parseInt(data.native_hawaiian_pacific_islander_population.toString() || "50"),
        },
        {
          race: "Others",
          value: parseInt(data.some_other_race_population.toString() || "50"),
        }

      ],[data])

      //config
      const ethnicityConfig = {
        race: {
          label: "Race",
          color: "hsl(var(--chart-1))",
        },
        value:{
          label: "Population",
          color: "hsl(var(--chart-1))",
        }
      } satisfies ChartConfig

      //graph dimensions
      const [windowWidth, setWindowWidth] = React.useState(0)
      const [chartHeight, setChartHeight] = React.useState(300)
    
      React.useEffect(() => {
        // Set initial width and calculate chart height
        const updateDimensions = () => {
          const width = window.innerWidth
          setWindowWidth(width)
        
          // Calculate chart height based on a percentage of the screen width
          // This makes it scale smoothly across all screen sizes
          let height
        
          if (width < 400) {
            height = 220 // Very small screens
          } else if (width < 640) {
            height = 250 // Mobile
          } else if (width < 768) {
            height = 300 // Small tablets
          } else if (width < 1024) {
            height = 350 // Tablets
          } else if (width < 1440) {
            height = 400 // Laptops / small desktops
          } else if (width < 1920) {
            height = 450 // Large desktops
          } else {
            height = 800 // Ultra-wide screens
          }
        
          setChartHeight(height)
        }
    
        updateDimensions()
        window.addEventListener("resize", updateDimensions)
    
        return () => window.removeEventListener("resize", updateDimensions)
      }, [])
    
      // Dynamic bar size based on screen width
      const getBarSize = () => {
        if (windowWidth < 640) return 20
        if (windowWidth < 768) return 30
        if (windowWidth < 1024) return 40
        return 50
      }

  return (
    <div className="w-full h-full flex">
      <Card className="bg-[#437a4520] w-full">
        <svg className="w-0 h-0 absolute">
          <defs>
            <linearGradient id={primaryGradientId} x1="1" y1="0" x2="0" y2="0">
              <stop offset="1%" stopColor="#437A45" stopOpacity={1.0} />
              <stop offset="95%" stopColor="#437A45" stopOpacity={0.03} />
            </linearGradient>

            <filter id={shadowId} x="0%" y="0%" width="140%" height="140%">
              <feDropShadow dx="5" dy="5" stdDeviation="0" floodOpacity="0.3" floodColor="#8F87F1" />
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
            className="text-base sm:text-lg md:text-[18px] lg:text-[18px]"
          >
            Racial Data
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          <div
            className="w-full"
            style={{
              height: `${chartHeight}px`,
              transition: "height 0.3s ease-in-out",
            }}
          >
            <ChartContainer config={ethnicityConfig} className="w-full h-full">
              <BarChart
                accessibilityLayer
                data={ethnicityData}
                layout="vertical"
                margin={{
                  left: 16,
                  right: 16,
                  top: 20,
                  bottom: 0,
                }}
                className="w-full h-full"
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="race"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  width={80}
                  fontSize={12}
                  className="text-primary"
                  interval={0}
                />
                <XAxis dataKey="value" type="number" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Bar
                  dataKey="value"
                  layout="vertical"
                  fill={`url(#${primaryGradientId})`}
                  radius={[0, 10, 10, 0]}
                  filter={`url(#${shadowId})`}
                  barSize={getBarSize()}
                >
                  <LabelList
                    dataKey="value"
                    position="insideRight"
                    offset={8}
                    className="fill-black text-xs sm:text-sm"
                    fontSize={windowWidth < 640 ? 10 : 12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>

  )
}

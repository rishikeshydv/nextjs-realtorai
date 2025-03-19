"use client"

import { Card } from "@/components/ui/card"
import { Area, Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", value: 40, highlight: false },
  { name: "Feb", value: 30, highlight: false },
  { name: "Mar", value: 45, highlight: false },
  { name: "Apr", value: 50, highlight: false },
  { name: "May", value: 35, highlight: false },
  { name: "Jun", value: 65, highlight: true },
  { name: "Jul", value: 75, highlight: false },
  { name: "Aug", value: 85, highlight: false },
  { name: "Sept", value: 70, highlight: false },
  { name: "Oct", value: 55, highlight: false },
  { name: "Nov", value: 60, highlight: false },
  { name: "Dec", value: 75, highlight: false },
]

export function BarChart() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity={1} />
              <stop offset="100%" stopColor="#4338ca" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
            <filter id="shadow" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#4f46e5" floodOpacity="0.3" />
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            domain={[0, "dataMax + 100"]}
            ticks={[0, 50, 100, 150, 200]}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="border-gray-800 bg-gray-900 p-3 text-xs shadow-lg">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium text-gray-400">Income</div>
                      <div className="text-right font-medium text-blue-400">${payload[0].value}K</div>
                      <div className="font-medium text-gray-400">Month</div>
                      <div className="text-right font-medium">{payload[0].payload.name}</div>
                    </div>
                  </Card>
                )
              }
              return null
            }}
          />
          <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} barSize={30} animationDuration={1500} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#4f46e5"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#areaGradient)"
            animationDuration={1500}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}


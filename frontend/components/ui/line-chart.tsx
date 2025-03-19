"use client"

import { Card } from "@/components/ui/card"
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", satisfied: 75, neutral: 20, unsatisfied: 5 },
  { name: "Feb", satisfied: 70, neutral: 22, unsatisfied: 8 },
  { name: "Mar", satisfied: 72, neutral: 20, unsatisfied: 8 },
  { name: "Apr", satisfied: 78, neutral: 18, unsatisfied: 4 },
  { name: "May", satisfied: 80, neutral: 15, unsatisfied: 5 },
  { name: "Jun", satisfied: 82, neutral: 13, unsatisfied: 5 },
  { name: "Jul", satisfied: 85, neutral: 12, unsatisfied: 3 },
  { name: "Aug", satisfied: 85, neutral: 12, unsatisfied: 3 },
  { name: "Sept", satisfied: 88, neutral: 10, unsatisfied: 2 },
  { name: "Oct", satisfied: 87, neutral: 11, unsatisfied: 2 },
  { name: "Nov", satisfied: 85, neutral: 12, unsatisfied: 3 },
  { name: "Dec", satisfied: 85, neutral: 12, unsatisfied: 3 },
]

export function LineChart() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <defs>
            <linearGradient id="colorSatisfied" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorUnsatisfied" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <filter id="glow" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} domain={[0, 100]} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="border-gray-800 bg-gray-900 p-3 text-xs shadow-lg">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium text-blue-500">Satisfied</div>
                      <div className="text-right font-medium">{payload[0].value}%</div>
                      <div className="font-medium text-yellow-500">Neutral</div>
                      <div className="text-right font-medium">{payload[1].value}%</div>
                      <div className="font-medium text-red-500">Unsatisfied</div>
                      <div className="text-right font-medium">{payload[2].value}%</div>
                    </div>
                  </Card>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="satisfied"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorSatisfied)"
            dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
            filter="url(#glow)"
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="neutral"
            stroke="#eab308"
            strokeWidth={3}
            dot={{ r: 4, fill: "#eab308", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#eab308", stroke: "#fff", strokeWidth: 2 }}
            filter="url(#glow)"
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="unsatisfied"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 4, fill: "#ef4444", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#ef4444", stroke: "#fff", strokeWidth: 2 }}
            filter="url(#glow)"
            animationDuration={1500}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}


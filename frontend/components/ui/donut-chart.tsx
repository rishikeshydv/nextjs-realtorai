"use client"

import { Card } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Salaries", value: 400000, color: "#4f46e5" },
  { name: "Operational Costs", value: 180000, color: "#a855f7" },
  { name: "Marketing", value: 160000, color: "#eab308" },
  { name: "Supply Chain", value: 120000, color: "#ef4444" },
]

export function DonutChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <defs>
          <filter id="shadow" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          filter="url(#shadow)"
          animationDuration={1500}
          animationBegin={0}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <Card className="border-gray-800 bg-gray-900 p-3 text-xs shadow-lg">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium text-gray-400">{data.name}</div>
                    <div className="text-right font-medium" style={{ color: data.color }}>
                      ${data.value.toLocaleString()}
                    </div>
                    <div className="font-medium text-gray-400">Percentage</div>
                    <div className="text-right font-medium">
                      {Math.round((data.value / data.reduce((a: { value: number }, b: { value: number }) => a.value + b.value, { value: 0 }).value) * 100)}%
                    </div>
                  </div>
                </Card>
              )
            }
            return null
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}


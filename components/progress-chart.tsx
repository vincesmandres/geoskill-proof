"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const CHART_DATA = [
  { timestamp: "Jan 15", confidence: 45 },
  { timestamp: "Jan 22", confidence: 62 },
  { timestamp: "Feb 05", confidence: 78 },
  { timestamp: "Feb 20", confidence: 85 },
  { timestamp: "Mar 08", confidence: 92 },
  { timestamp: "Mar 15", confidence: 96 },
]

export function ProgressChart() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height={300} minHeight={300}>
        <LineChart data={CHART_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} />
          <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: "12px" }} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0px",
              fontSize: "12px",
            }}
          />
          <Line
            type="monotone"
            dataKey="confidence"
            stroke="hsl(var(--accent))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--accent))", r: 4 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

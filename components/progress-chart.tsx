"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const CHART_DATA = [
  { timestamp: "2024-01-15", confidence: 45 },
  { timestamp: "2024-01-22", confidence: 62 },
  { timestamp: "2024-02-05", confidence: 78 },
  { timestamp: "2024-02-20", confidence: 85 },
  { timestamp: "2024-03-08", confidence: 92 },
  { timestamp: "2024-03-15", confidence: 96 },
]

export function ProgressChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
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
  )
}

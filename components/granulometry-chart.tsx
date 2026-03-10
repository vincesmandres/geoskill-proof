"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

// Sieve sizes in mm (for X axis)
const SIEVE_SIZES = [4.75, 2.0, 0.85, 0.425, 0.075]

interface GranulometryChartProps {
  passingPercentages: number[]
}

export function GranulometryChart({ passingPercentages }: GranulometryChartProps) {
  const data = SIEVE_SIZES.map((size, index) => ({
    size,
    passing: passingPercentages[index] ?? 0,
  })) // No reverse - keep larger to smaller

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="size"
            scale="log"
            domain={[10, 0.05]}
            type="number"
            reversed={true}
            tickFormatter={(value) => value.toString()}
            label={{
              value: "Tamano de particula (mm)",
              position: "bottom",
              offset: 40,
              style: { fontSize: 12, fill: "hsl(var(--muted-foreground))" },
            }}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            stroke="hsl(var(--border))"
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            label={{
              value: "% que pasa",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 12, fill: "hsl(var(--muted-foreground))" },
            }}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            stroke="hsl(var(--border))"
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(2)}%`, "% que pasa"]}
            labelFormatter={(label) => `${label} mm`}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0px",
              fontSize: "12px",
            }}
          />
          <ReferenceLine y={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
          <Line
            type="monotone"
            dataKey="passing"
            stroke="hsl(var(--accent))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: "hsl(var(--accent))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

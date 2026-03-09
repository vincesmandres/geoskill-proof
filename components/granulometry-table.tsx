"use client"

import { useMemo } from "react"
import type { ValidationResult } from "@/lib/types"

const SIEVES = ["4.75mm", "2.00mm", "0.850mm", "0.425mm", "Fondo"]

interface GranulometryTableProps {
  totalSampleMass: number
  retainedMasses: number[]
  onTotalMassChange: (value: number) => void
  onMassChange: (index: number, value: number) => void
  result: ValidationResult | null
}

export function GranulometryTable({
  totalSampleMass,
  retainedMasses,
  onTotalMassChange,
  onMassChange,
  result,
}: GranulometryTableProps) {
  const totalMeasured = useMemo(
    () => retainedMasses.reduce((a, b) => a + b, 0),
    [retainedMasses]
  )

  return (
    <div className="space-y-6">
      {/* Total mass input */}
      <div className="flex items-center gap-4 p-4 bg-muted/50">
        <label className="text-sm font-medium text-foreground whitespace-nowrap">
          Masa total de muestra:
        </label>
        <input
          type="number"
          value={totalSampleMass}
          onChange={(e) => onTotalMassChange(Number(e.target.value) || 0)}
          className="w-32 bg-white border border-border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-right"
        />
        <span className="text-sm text-muted-foreground">g</span>
      </div>

      {/* Main data table */}
      <div className="overflow-hidden border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-foreground text-white">
              <th className="py-3 px-4 text-left font-semibold">Tamiz</th>
              <th className="py-3 px-4 text-right font-semibold">Masa (g)</th>
              <th className="py-3 px-4 text-right font-semibold">% Ret.</th>
              <th className="py-3 px-4 text-right font-semibold">% Acum.</th>
              <th className="py-3 px-4 text-right font-semibold">% Pasa</th>
            </tr>
          </thead>
          <tbody>
            {SIEVES.map((sieve, i) => (
              <tr
                key={sieve}
                className="border-t border-border hover:bg-muted/30 transition-colors"
              >
                <td className="py-3 px-4 font-medium text-foreground">{sieve}</td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    value={retainedMasses[i]}
                    onChange={(e) => onMassChange(i, Number(e.target.value) || 0)}
                    className="w-20 bg-muted border border-border px-2 py-1 text-sm text-right focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  />
                </td>
                <td className="py-3 px-4 text-right font-mono text-xs text-muted-foreground">
                  {result?.retainedPercentage[i]?.toFixed(2) ?? "-"}
                </td>
                <td className="py-3 px-4 text-right font-mono text-xs text-muted-foreground">
                  {result?.cumulativePercentage[i]?.toFixed(2) ?? "-"}
                </td>
                <td className="py-3 px-4 text-right font-mono text-xs font-semibold text-foreground">
                  {result?.passingPercentages[i]?.toFixed(2) ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border bg-muted/50">
              <td className="py-3 px-4 font-semibold text-foreground">Total</td>
              <td className="py-3 px-4 text-right font-semibold">{totalMeasured.toFixed(1)}</td>
              <td className="py-3 px-4 text-right font-mono text-xs">100.00</td>
              <td className="py-3 px-4 text-right font-mono text-xs">-</td>
              <td className="py-3 px-4 text-right font-mono text-xs">-</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Validation status */}
      {result && (
        <div className="space-y-3">
          <div
            className={`flex items-center gap-3 p-4 ${
              result.validMassBalance
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                result.validMassBalance ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                result.validMassBalance ? "text-green-700" : "text-red-700"
              }`}
            >
              {result.testStatus}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/50 p-3">
              <span className="text-xs text-muted-foreground block">Error de masa</span>
              <span className="text-lg font-bold text-foreground">{result.pError}%</span>
            </div>
            <div className="bg-muted/50 p-3">
              <span className="text-xs text-muted-foreground block">% Finos (fondo)</span>
              <span className="text-lg font-bold text-foreground">{result.finesPercent}%</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground bg-muted/30 p-3">
            {result.methodStatus}
          </p>
        </div>
      )}
    </div>
  )
}

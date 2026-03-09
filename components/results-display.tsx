"use client"

import type { ValidationResult } from "@/lib/types"

const SIEVES = ["4.75mm", "2.00mm", "0.850mm", "0.425mm", "Fondo"]

export function ResultsDisplay({ result }: { result: ValidationResult }) {
  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-3 p-3 rounded-lg ${result.validMassBalance ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20"}`}>
        <div className={`w-3 h-3 rounded-full ${result.validMassBalance ? "bg-green-500" : "bg-red-500"}`} />
        <span className={`text-sm font-medium ${result.validMassBalance ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
          {result.testStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted p-3 rounded-lg">
          <span className="text-xs text-muted-foreground block mb-1">Masa inicial</span>
          <span className="text-lg font-semibold">{result.initialSample}g</span>
        </div>
        <div className="bg-muted p-3 rounded-lg">
          <span className="text-xs text-muted-foreground block mb-1">Masa medida</span>
          <span className="text-lg font-semibold">{result.totalSampleReal}g</span>
        </div>
        <div className="bg-muted p-3 rounded-lg">
          <span className="text-xs text-muted-foreground block mb-1">Error</span>
          <span className="text-lg font-semibold">{result.pError}%</span>
        </div>
        <div className="bg-muted p-3 rounded-lg">
          <span className="text-xs text-muted-foreground block mb-1">Finos</span>
          <span className="text-lg font-semibold">{result.finesPercent}%</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">{result.methodStatus}</p>

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="font-semibold py-3 px-4 text-left">Tamiz</th>
              <th className="font-semibold py-3 px-4 text-right">% Ret.</th>
              <th className="font-semibold py-3 px-4 text-right">% Acum.</th>
              <th className="font-semibold py-3 px-4 text-right">% Pasa</th>
            </tr>
          </thead>
          <tbody>
            {SIEVES.map((sieve, i) => (
              <tr key={sieve} className="border-t border-border hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium">{sieve}</td>
                <td className="text-right py-3 px-4 font-mono text-xs">{result.retainedPercentage[i]}</td>
                <td className="text-right py-3 px-4 font-mono text-xs">{result.cumulativePercentage[i]}</td>
                <td className="text-right py-3 px-4 font-mono text-xs">{result.passingPercentages[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

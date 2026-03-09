"use client"

import type { ValidationResult } from "@/lib/types"

const SIEVES = ["4.75mm", "2.00mm", "0.850mm", "0.425mm", "Fondo"]

export function ResultsDisplay({ result }: { result: ValidationResult }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${result.validMassBalance ? "bg-green-500" : "bg-red-500"}`} />
        <span className="text-sm">{result.testStatus}</span>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Masa inicial</span>
          <span>{result.initialSample}g</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Masa medida</span>
          <span>{result.totalSampleReal}g</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Error</span>
          <span>{result.pError}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Finos</span>
          <span>{result.finesPercent}%</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{result.methodStatus}</p>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted-foreground text-left">
            <th className="font-normal pb-2">Tamiz</th>
            <th className="font-normal pb-2 text-right">% Ret.</th>
            <th className="font-normal pb-2 text-right">% Acum.</th>
            <th className="font-normal pb-2 text-right">% Pasa</th>
          </tr>
        </thead>
        <tbody>
          {SIEVES.map((sieve, i) => (
            <tr key={sieve} className="border-t border-border">
              <td className="py-2">{sieve}</td>
              <td className="text-right py-2 font-mono text-xs">{result.retainedPercentage[i]}</td>
              <td className="text-right py-2 font-mono text-xs">{result.cumulativePercentage[i]}</td>
              <td className="text-right py-2 font-mono text-xs">{result.passingPercentages[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

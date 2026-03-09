"use client"

import { CheckCircle, XCircle } from "lucide-react"
import type { ValidationResult } from "@/lib/types"

const SIEVES = ["4.75mm", "2.00mm", "0.850mm", "0.425mm", "Fondo"]

export function ResultsDisplay({ result }: { result: ValidationResult }) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        {result.validMassBalance ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : (
          <XCircle className="h-5 w-5 text-destructive" />
        )}
        <h2 className="text-lg font-semibold text-card-foreground">Resultados</h2>
      </div>

      <div
        className={`rounded p-3 mb-4 ${
          result.validMassBalance
            ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200"
            : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"
        }`}
      >
        <p className="text-sm font-medium">{result.testStatus}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-muted-foreground">Masa inicial:</span>
          <span className="ml-2 font-medium text-card-foreground">{result.initialSample}g</span>
        </div>
        <div>
          <span className="text-muted-foreground">Masa medida:</span>
          <span className="ml-2 font-medium text-card-foreground">{result.totalSampleReal}g</span>
        </div>
        <div>
          <span className="text-muted-foreground">Error:</span>
          <span className="ml-2 font-medium text-card-foreground">{result.pError}%</span>
        </div>
        <div>
          <span className="text-muted-foreground">Finos:</span>
          <span className="ml-2 font-medium text-card-foreground">{result.finesPercent}%</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{result.methodStatus}</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 text-muted-foreground font-medium">Tamiz</th>
              <th className="text-right py-2 text-muted-foreground font-medium">% Ret.</th>
              <th className="text-right py-2 text-muted-foreground font-medium">% Acum.</th>
              <th className="text-right py-2 text-muted-foreground font-medium">% Pasa</th>
            </tr>
          </thead>
          <tbody>
            {SIEVES.map((sieve, i) => (
              <tr key={sieve} className="border-b last:border-0">
                <td className="py-2 text-card-foreground">{sieve}</td>
                <td className="text-right py-2 font-mono text-card-foreground">
                  {result.retainedPercentage[i]}
                </td>
                <td className="text-right py-2 font-mono text-card-foreground">
                  {result.cumulativePercentage[i]}
                </td>
                <td className="text-right py-2 font-mono text-card-foreground">
                  {result.passingPercentages[i]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ValidationForm } from "@/components/validation-form"
import { ResultsDisplay } from "@/components/results-display"
import { CostEstimator } from "@/components/cost-estimator"
import type { ValidationResult } from "@/lib/types"

export default function Home() {
  const [result, setResult] = useState<ValidationResult | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-foreground text-balance">
            Sistema de Verificacion de Habilidades Geotecnicas
          </h2>
          <p className="text-muted-foreground">
            Ingresa los datos de tu practica de laboratorio para validar y registrar en blockchain.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <ValidationForm onResult={setResult} />
            {result && <ResultsDisplay result={result} />}
          </div>

          <div>
            <CostEstimator />
          </div>
        </div>
      </main>

      <footer className="border-t mt-12">
        <div className="mx-auto max-w-4xl px-4 py-6 text-center text-sm text-muted-foreground">
          GeoSkill Proof - Verificacion ISO/TS 17892-4:2004
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ValidationForm } from "@/components/validation-form"
import { ResultsDisplay } from "@/components/results-display"
import type { ValidationResult } from "@/lib/types"

export default function Home() {
  const [result, setResult] = useState<ValidationResult | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Verificacion de Practicas
        </h1>
        <p className="text-muted-foreground mb-12">
          Valida y registra tus practicas de laboratorio en blockchain.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
              Datos de la practica
            </h2>
            <ValidationForm onResult={setResult} />
          </section>

          {result && (
            <section>
              <h2 className="text-xs uppercase tracking-wider text-muted-foreground mb-6">
                Resultados
              </h2>
              <ResultsDisplay result={result} />
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

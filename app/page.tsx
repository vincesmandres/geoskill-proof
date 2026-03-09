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

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            Verificacion de Practicas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Valida y registra tus practicas de laboratorio en blockchain de forma segura y transparente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-card p-8 rounded-lg border border-border">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent"></span>
              Datos de la practica
            </h2>
            <ValidationForm onResult={setResult} />
          </section>

          <section className={`bg-card p-8 rounded-lg border transition-all duration-300 ${result ? "border-accent border-l-4" : "border-border"}`}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent"></span>
              Resultados
            </h2>
            {result ? (
              <ResultsDisplay result={result} />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-muted-foreground text-sm">
                  Ingresa los datos y valida tu practica para ver los resultados aqui.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

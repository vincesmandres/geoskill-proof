"use client"

import { useState, useMemo, useCallback } from "react"
import { Header } from "@/components/header"
import { GranulometryTable } from "@/components/granulometry-table"
import { GranulometryChart } from "@/components/granulometry-chart"
import { useWallet } from "@/components/wallet-provider"
import { validateGranulometria } from "@/lib/validator"
import type { PracticeData, ValidationResult } from "@/lib/types"

export default function TestPage() {
  const { connected, signMessage } = useWallet()
  const [signed, setSigned] = useState(false)
  const [signing, setSigning] = useState(false)

  const [formData, setFormData] = useState<PracticeData>({
    studentId: "",
    practiceId: "granulo-001",
    totalSampleMass: 300,
    retainedMasses: [125, 75, 45, 35, 20],
  })

  const result: ValidationResult | null = useMemo(() => {
    const totalMasses = formData.retainedMasses.reduce((a, b) => a + b, 0)
    if (totalMasses === 0 || formData.totalSampleMass === 0) return null
    return validateGranulometria(formData)
  }, [formData])

  const handleTotalMassChange = useCallback((value: number) => {
    setFormData((prev) => ({ ...prev, totalSampleMass: value }))
    setSigned(false)
  }, [])

  const handleMassChange = useCallback((index: number, value: number) => {
    setFormData((prev) => {
      const newMasses = [...prev.retainedMasses]
      newMasses[index] = value
      return { ...prev, retainedMasses: newMasses }
    })
    setSigned(false)
  }, [])

  const handleSign = async () => {
    if (!connected || !result?.validMassBalance) return
    setSigning(true)
    try {
      const message = new TextEncoder().encode(
        JSON.stringify({
          practiceId: formData.practiceId,
          score: result.score,
          timestamp: Date.now(),
        })
      )
      const signature = await signMessage(message)
      if (signature) setSigned(true)
    } catch (error) {
      console.error("Error signing:", error)
    } finally {
      setSigning(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header with validation status */}
        <div className="mb-8 flex items-start justify-between">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            T001. Curva Granulométrica
          </h1>
          {result && (
            <div
              className={`flex items-center gap-2 px-4 py-2 border ${
                result.validMassBalance
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
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
          )}
        </div>

        {/* Two-column container */}
        <div className="border border-border overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: Data Table */}
            <div className="p-6 border-r border-border">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-accent"></span>
                Datos del Ensayo
              </h2>
              <GranulometryTable
                totalSampleMass={formData.totalSampleMass}
                retainedMasses={formData.retainedMasses}
                onTotalMassChange={handleTotalMassChange}
                onMassChange={handleMassChange}
                result={result}
              />

              {connected && result?.validMassBalance && !signed && (
                <button
                  onClick={handleSign}
                  disabled={signing}
                  className="w-full mt-6 py-3 bg-accent text-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {signing ? "Firmando..." : "Firmar con Wallet"}
                </button>
              )}

              {signed && (
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 px-4 py-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Practica firmada exitosamente
                </div>
              )}
            </div>

            {/* Right: Granulometry Chart */}
            <div className="p-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-accent"></span>
                Curva de Distribución
              </h2>
              <div className="h-[400px]">
                {result ? (
                  <GranulometryChart passingPercentages={result.passingPercentages} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-16 h-16 bg-muted flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      La curva aparecerá cuando ingreses los datos
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

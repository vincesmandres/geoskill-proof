"use client"

import { useState, useMemo, useCallback } from "react"
import { Header } from "@/components/header"
import { GranulometryTable } from "@/components/granulometry-table"
import { GranulometryChart } from "@/components/granulometry-chart"
import { useWallet } from "@/components/wallet-provider"
import { validateGranulometria } from "@/lib/validator"
import type { PracticeData, ValidationResult } from "@/lib/types"

export default function Home() {
  const { connected, signMessage, connect, connecting } = useWallet()
  const [signed, setSigned] = useState(false)
  const [signing, setSigning] = useState(false)

  const [formData, setFormData] = useState<PracticeData>({
    studentId: "",
    practiceId: "granulo-001",
    totalSampleMass: 300,
    retainedMasses: [125, 75, 45, 35, 20],
  })

  // Calculate results in real-time
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
        {/* Title Section - Higher position */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-foreground">
            Verificacion de Practicas
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Ingresa los datos de tu ensayo granulometrico y observa los resultados en tiempo real.
          </p>
        </div>

        {/* Connect wallet prompt */}
        {!connected && (
          <div className="mb-8 p-6 bg-muted/50 rounded-xl border border-border text-center">
            <p className="text-muted-foreground mb-4">
              Conecta tu wallet para poder firmar y registrar tus practicas en blockchain.
            </p>
            <button
              onClick={connect}
              disabled={connecting}
              className="px-6 py-3 bg-accent text-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {connecting ? "Conectando..." : "Conectar Wallet"}
            </button>
          </div>
        )}

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Data Table */}
          <section className="bg-white p-6 rounded-xl border border-border">
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

            {/* Sign button */}
            {connected && result?.validMassBalance && !signed && (
              <button
                onClick={handleSign}
                disabled={signing}
                className="w-full mt-6 py-3 bg-accent text-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {signing ? "Firmando..." : "Firmar con Wallet"}
              </button>
            )}

            {signed && (
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 px-4 py-3 rounded-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Practica firmada y registrada exitosamente
              </div>
            )}
          </section>

          {/* Right: Granulometry Chart */}
          <section className="bg-white p-6 rounded-xl border border-border">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-accent"></span>
              Curva Granulometrica
            </h2>
            <div className="h-[400px]">
              {result ? (
                <GranulometryChart passingPercentages={result.passingPercentages} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    La curva granulometrica aparecera aqui cuando ingreses los datos.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

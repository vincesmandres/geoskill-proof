"use client"

import { useState } from "react"
import { useWallet } from "@/components/wallet-provider"
import { validateGranulometria } from "@/lib/validator"
import type { PracticeData, ValidationResult } from "@/lib/types"

const SIEVES = ["4.75mm", "2.00mm", "0.850mm", "0.425mm", "Fondo"]

export function ValidationForm({
  onResult,
}: {
  onResult: (result: ValidationResult | null) => void
}) {
  const { connected, signMessage } = useWallet()
  const [loading, setLoading] = useState(false)
  const [signed, setSigned] = useState(false)

  const [formData, setFormData] = useState<PracticeData>({
    studentId: "",
    practiceId: "granulo-001",
    totalSampleMass: 300,
    retainedMasses: [125, 75, 45, 35, 20],
  })

  const handleMassChange = (index: number, value: string) => {
    const newMasses = [...formData.retainedMasses]
    newMasses[index] = Number(value) || 0
    setFormData({ ...formData, retainedMasses: newMasses })
  }

  const handleValidate = async () => {
    if (!connected) return
    setLoading(true)
    
    try {
      const result = validateGranulometria(formData)
      onResult(result)

      if (result.validMassBalance) {
        const message = new TextEncoder().encode(
          JSON.stringify({
            practiceId: formData.practiceId,
            score: result.score,
            timestamp: Date.now(),
          })
        )
        const signature = await signMessage(message)
        if (signature) setSigned(true)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      studentId: "",
      practiceId: "granulo-001",
      totalSampleMass: 300,
      retainedMasses: [125, 75, 45, 35, 20],
    })
    onResult(null)
    setSigned(false)
  }

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          Conecta tu wallet para comenzar la validacion.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Masa total de muestra (g)
        </label>
        <input
          type="number"
          value={formData.totalSampleMass}
          onChange={(e) =>
            setFormData({ ...formData, totalSampleMass: Number(e.target.value) })
          }
          className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-4">
          Masas retenidas por tamiz (g)
        </label>
        <div className="space-y-3">
          {SIEVES.map((sieve, index) => (
            <div key={sieve} className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-24 font-medium">{sieve}</span>
              <input
                type="number"
                value={formData.retainedMasses[index]}
                onChange={(e) => handleMassChange(index, e.target.value)}
                className="flex-1 bg-muted border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          onClick={handleValidate}
          disabled={loading}
          className="flex-1 text-sm font-semibold px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Validando..." : "Validar Practica"}
        </button>
        <button
          onClick={handleReset}
          className="text-sm font-medium px-6 py-3 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          Reiniciar
        </button>
      </div>

      {signed && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-4 py-2 rounded-lg">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Firmado con wallet
        </div>
      )}
    </div>
  )
}

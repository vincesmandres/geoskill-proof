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
      <p className="text-muted-foreground text-sm">
        Conecta tu wallet para comenzar la validacion.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-muted-foreground mb-2">
          Masa total de muestra (g)
        </label>
        <input
          type="number"
          value={formData.totalSampleMass}
          onChange={(e) =>
            setFormData({ ...formData, totalSampleMass: Number(e.target.value) })
          }
          className="w-full max-w-xs bg-transparent border-b border-border px-0 py-2 text-sm focus:outline-none focus:border-foreground transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm text-muted-foreground mb-3">
          Masas retenidas por tamiz (g)
        </label>
        <div className="space-y-3">
          {SIEVES.map((sieve, index) => (
            <div key={sieve} className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-20">{sieve}</span>
              <input
                type="number"
                value={formData.retainedMasses[index]}
                onChange={(e) => handleMassChange(index, e.target.value)}
                className="w-24 bg-transparent border-b border-border px-0 py-1 text-sm focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          onClick={handleValidate}
          disabled={loading}
          className="text-sm px-4 py-2 bg-foreground text-background rounded hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Validando..." : "Validar"}
        </button>
        <button
          onClick={handleReset}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Reiniciar
        </button>
      </div>

      {signed && (
        <p className="text-sm text-accent">Firmado con wallet</p>
      )}
    </div>
  )
}

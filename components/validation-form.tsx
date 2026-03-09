"use client"

import { useState } from "react"
import { useWallet } from "@/components/wallet-provider"
import { Loader2 } from "lucide-react"
import { validateGranulometria } from "@/lib/validator"
import type { PracticeData, ValidationResult } from "@/lib/types"

const DEFAULT_SIEVES = ["4.75mm", "2.00mm", "0.850mm", "0.425mm", "Fondo"]

export function ValidationForm({
  onResult,
}: {
  onResult: (result: ValidationResult | null) => void
}) {
  const { publicKey, connected, signMessage } = useWallet()
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
      // Validate data
      const result = validateGranulometria(formData)
      onResult(result)

      // Sign result if validation passed
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
      console.error("Validation error:", error)
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
      <div className="rounded-lg border bg-card p-6 text-center">
        <p className="text-muted-foreground">Conecta tu wallet para comenzar</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold mb-4 text-card-foreground">
        G001: Curva Granulometrica
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-card-foreground">
            Masa total de muestra (g)
          </label>
          <input
            type="number"
            value={formData.totalSampleMass}
            onChange={(e) =>
              setFormData({ ...formData, totalSampleMass: Number(e.target.value) })
            }
            className="w-full rounded border bg-background px-3 py-2 text-sm text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-card-foreground">
            Masas retenidas por tamiz (g)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {DEFAULT_SIEVES.map((sieve, index) => (
              <div key={sieve}>
                <label className="block text-xs text-muted-foreground mb-1">
                  {sieve}
                </label>
                <input
                  type="number"
                  value={formData.retainedMasses[index]}
                  onChange={(e) => handleMassChange(index, e.target.value)}
                  className="w-full rounded border bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={handleValidate}
            disabled={loading}
            className="flex-1 rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="mx-auto h-4 w-4 animate-spin" />
            ) : (
              "Validar Practica"
            )}
          </button>
          <button
            onClick={handleReset}
            className="rounded border px-4 py-2 text-sm font-medium text-card-foreground hover:bg-muted"
          >
            Reiniciar
          </button>
        </div>

        {signed && (
          <p className="text-sm text-green-600 text-center">
            Resultado firmado con tu wallet
          </p>
        )}
      </div>
    </div>
  )
}

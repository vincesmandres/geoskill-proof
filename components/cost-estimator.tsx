"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"
import { estimateCosts } from "@/lib/validator"

export function CostEstimator() {
  const [solPrice, setSolPrice] = useState(150)
  const [numCredentials, setNumCredentials] = useState(1)

  const singleCost = estimateCosts(solPrice)
  const totalCost = {
    ...singleCost,
    total: singleCost.total * numCredentials,
    totalUsd: singleCost.totalUsd * numCredentials,
  }

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-card-foreground">Estimacion de Costos</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Precio SOL (USD)
          </label>
          <input
            type="number"
            value={solPrice}
            onChange={(e) => setSolPrice(Number(e.target.value))}
            className="w-full rounded border bg-background px-3 py-2 text-sm text-foreground"
          />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-1">
            Credenciales a emitir
          </label>
          <input
            type="number"
            min={1}
            value={numCredentials}
            onChange={(e) => setNumCredentials(Math.max(1, Number(e.target.value)))}
            className="w-full rounded border bg-background px-3 py-2 text-sm text-foreground"
          />
        </div>
      </div>

      <div className="space-y-2 text-sm border-t pt-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Fee por transaccion:</span>
          <span className="font-mono text-card-foreground">{singleCost.transactionFee} SOL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Rent exempt (cuenta):</span>
          <span className="font-mono text-card-foreground">{singleCost.rentExempt} SOL</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Ejecucion programa:</span>
          <span className="font-mono text-card-foreground">{singleCost.programExecution} SOL</span>
        </div>
        <div className="flex justify-between border-t pt-2 font-medium">
          <span className="text-card-foreground">Total ({numCredentials}x):</span>
          <span className="font-mono text-card-foreground">{totalCost.total.toFixed(6)} SOL</span>
        </div>
        <div className="flex justify-between text-primary font-medium">
          <span>Equivalente USD:</span>
          <span className="font-mono">${totalCost.totalUsd.toFixed(4)}</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        * Estimacion basada en Solana Devnet. Costos reales pueden variar.
      </p>
    </div>
  )
}

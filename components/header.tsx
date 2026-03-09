"use client"

import { useWallet } from "@/components/wallet-provider"
import { Wallet, LogOut } from "lucide-react"

export function Header() {
  const { publicKey, connected, connecting, connect, disconnect } = useWallet()

  return (
    <header className="border-b bg-card">
      <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">GeoSkill Proof</h1>
          <p className="text-sm text-muted-foreground">Verificacion de habilidades en blockchain</p>
        </div>
        <div className="flex items-center gap-3">
          {connected && publicKey && (
            <span className="text-xs font-mono text-muted-foreground hidden sm:block">
              {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
            </span>
          )}
          {connected ? (
            <button
              onClick={disconnect}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Desconectar</span>
            </button>
          ) : (
            <button
              onClick={connect}
              disabled={connecting}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              <Wallet className="h-4 w-4" />
              {connecting ? "Conectando..." : "Conectar Wallet"}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

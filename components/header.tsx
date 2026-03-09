"use client"

import { useWallet } from "@/components/wallet-provider"

export function Header() {
  const { publicKey, connected, connecting, connect, disconnect } = useWallet()

  return (
    <header className="px-6 py-4 flex items-center justify-between">
      <span className="text-sm font-medium tracking-tight">GeoSkill</span>
      
      {connected ? (
        <button
          onClick={disconnect}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
        </button>
      ) : (
        <button
          onClick={connect}
          disabled={connecting}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          {connecting ? "Conectando..." : "Conectar Wallet"}
        </button>
      )}
    </header>
  )
}

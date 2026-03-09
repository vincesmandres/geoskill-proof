"use client"

import { useWallet } from "@/components/wallet-provider"

export function Header() {
  const { publicKey, connected, connecting, connect, disconnect } = useWallet()

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-semibold tracking-tight">GeoSkill</span>
        
        <nav className="flex items-center gap-8">
          <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            Inicio
          </span>
          <span className="text-sm font-medium tracking-widest uppercase bg-foreground text-background px-4 py-2 cursor-pointer">
            Validar
          </span>
          <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
            Acerca
          </span>
        </nav>

        {connected ? (
          <button
            onClick={disconnect}
            className="text-sm font-medium px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
          >
            {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
          </button>
        ) : (
          <button
            onClick={connect}
            disabled={connecting}
            className="text-sm font-medium px-4 py-2 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {connecting ? "Conectando..." : "Conectar"}
          </button>
        )}
      </div>
    </header>
  )
}

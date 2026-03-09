"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export function Header() {
  const { publicKey } = useWallet()

  return (
    <header className="border-b bg-card">
      <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">GeoSkill Proof</h1>
          <p className="text-sm text-muted-foreground">Verificacion de habilidades en blockchain</p>
        </div>
        <div className="flex items-center gap-4">
          {publicKey && (
            <span className="text-xs font-mono text-muted-foreground hidden sm:block">
              {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
            </span>
          )}
          <WalletMultiButton />
        </div>
      </div>
    </header>
  )
}

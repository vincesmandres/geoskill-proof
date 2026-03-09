"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface WalletContextType {
  publicKey: string | null
  connected: boolean
  connecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
  signMessage: (message: Uint8Array) => Promise<Uint8Array | null>
}

const WalletContext = createContext<WalletContextType | null>(null)

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) throw new Error("useWallet must be used within WalletProvider")
  return context
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)

  const connect = useCallback(async () => {
    const phantom = (window as any).phantom?.solana
    if (!phantom?.isPhantom) {
      window.open("https://phantom.app/", "_blank")
      return
    }

    setConnecting(true)
    try {
      const response = await phantom.connect()
      setPublicKey(response.publicKey.toString())
      setConnected(true)
    } catch (err) {
      console.error("Connection failed:", err)
    } finally {
      setConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    const phantom = (window as any).phantom?.solana
    phantom?.disconnect()
    setPublicKey(null)
    setConnected(false)
  }, [])

  const signMessage = useCallback(async (message: Uint8Array): Promise<Uint8Array | null> => {
    const phantom = (window as any).phantom?.solana
    if (!phantom) return null
    
    try {
      const { signature } = await phantom.signMessage(message, "utf8")
      return signature
    } catch (err) {
      console.error("Signing failed:", err)
      return null
    }
  }, [])

  return (
    <WalletContext.Provider value={{ publicKey, connected, connecting, connect, disconnect, signMessage }}>
      {children}
    </WalletContext.Provider>
  )
}

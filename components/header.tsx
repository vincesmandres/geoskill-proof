"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useWallet } from "@/components/wallet-provider"
import { Menu, X } from "lucide-react"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { publicKey, connected, connecting, connect, disconnect } = useWallet()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const menuItems = [
    { label: "Home", href: "/", active: pathname === "/" },
    { label: "Test", href: "/test", active: pathname === "/test" },
    { label: "About", href: "/about", active: pathname === "/about" },
  ]

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => router.push("/")} className="text-2xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
          GeoSkill
        </button>
        
        <div className="flex items-center gap-4">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 border border-border hover:bg-muted transition-colors"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            
            {menuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-border shadow-lg overflow-hidden">
                {menuItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href)
                      setMenuOpen(false)
                    }}
                    className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-accent text-foreground"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {connected ? (
            <button
              onClick={disconnect}
              className="text-sm font-medium px-4 py-2 border border-border hover:bg-muted transition-colors"
            >
              {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
            </button>
          ) : (
            <button
              onClick={connect}
              disabled={connecting}
              className="text-sm font-semibold px-5 py-2 bg-accent text-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {connecting ? "Conectando..." : "Conectar Wallet"}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

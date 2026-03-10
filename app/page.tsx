"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/header"

const TESTS = [
  {
    level: "Básico",
    tests: [
      { name: "Granulometría", code: "T001", desc: "Análisis de distribución de tamaño de partículas" },
      { name: "Límite Líquido", code: "T002", desc: "Determinación del límite de consistencia" },
    ],
  },
  {
    level: "Intermedio",
    tests: [
      { name: "Compresión Triaxial", code: "T003", desc: "Ensayo de resistencia al corte" },
      { name: "Permeabilidad", code: "T004", desc: "Medición de conductividad hidráulica" },
    ],
  },
  {
    level: "Avanzado",
    tests: [
      { name: "Consolidación", code: "T005", desc: "Análisis de compresibilidad" },
      { name: "Corte Directo", code: "T006", desc: "Determinación de parámetros de resistencia" },
    ],
  },
]

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-foreground">
            GeoSkill Proof
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Plataforma de verificación académica para ensayos de geotecnia, respaldada por blockchain para garantizar la integridad y autenticidad de tus prácticas de laboratorio.
          </p>
          <button
            onClick={() => router.push("/test")}
            className="px-8 py-4 bg-accent text-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Empezar
          </button>
        </div>

        {/* Tests Schema */}
        <div className="space-y-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-center mb-12">
            Ensayos de Geotecnia por Niveles
          </h2>

          {TESTS.map((levelGroup) => (
            <div key={levelGroup.level} className="space-y-4">
              <h3 className="text-xl font-bold text-foreground uppercase tracking-wide">
                {levelGroup.level}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {levelGroup.tests.map((test) => (
                  <button
                    key={test.code}
                    onClick={() => test.code === "T001" && router.push("/test")}
                    className={`p-6 border text-left transition-all ${
                      test.code === "T001"
                        ? "border-accent bg-white hover:bg-muted cursor-pointer"
                        : "border-border opacity-60 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{test.name}</h4>
                      <span className="text-xs font-bold text-accent">{test.code}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{test.desc}</p>
                    {test.code === "T001" && (
                      <span className="inline-block mt-3 text-xs font-semibold text-accent">
                        Disponible →
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

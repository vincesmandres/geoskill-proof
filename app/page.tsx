"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { EssayCard } from "@/components/essay-card"
import { ConceptsCard } from "@/components/concepts-card"
import { VerificationTable } from "@/components/verification-table"
import { ProgressChart } from "@/components/progress-chart"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"essay" | "concepts">("essay")

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Main Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-2 text-foreground">
            GeoSkill Proof
          </h1>
          <p className="text-base text-muted-foreground">
            Academic verification powered by blockchain
          </p>
        </div>

        {/* Tab Section */}
        <div className="flex items-center justify-center gap-2 mb-12 border-b border-border pb-0">
          <button
            onClick={() => setActiveTab("essay")}
            className={`px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all ${
              activeTab === "essay"
                ? "text-foreground border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Essay
          </button>
          <button
            onClick={() => setActiveTab("concepts")}
            className={`px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all ${
              activeTab === "concepts"
                ? "text-foreground border-b-2 border-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Concepts & Information
          </button>
        </div>

        {/* Essay and Concepts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <EssayCard />
          <ConceptsCard />
        </div>

        {/* Data Results Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <span className="w-8 h-0.5 bg-accent"></span>
            Data Results
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Verification Table */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-accent"></span>
                Verification History
              </h3>
              <VerificationTable />
            </div>

            {/* Progress Chart */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-accent"></span>
                Verification Confidence
              </h3>
              <div className="bg-white border border-border p-6 h-80">
                <ProgressChart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


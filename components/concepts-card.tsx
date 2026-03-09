"use client"

export function ConceptsCard() {
  const concepts = [
    { title: "Blockchain Verification", relevance: 95 },
    { title: "Smart Contracts", relevance: 87 },
    { title: "Academic Credentials", relevance: 92 },
    { title: "Data Integrity", relevance: 88 },
    { title: "Decentralized Systems", relevance: 81 },
  ]

  return (
    <div className="bg-white border border-border p-6 h-full">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <span className="w-6 h-0.5 bg-accent"></span>
        Key Concepts
      </h3>
      <div className="space-y-3">
        {concepts.map((concept) => (
          <div key={concept.title} className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{concept.title}</p>
              <div className="w-full bg-muted h-1.5 mt-2 overflow-hidden border border-border">
                <div
                  className="h-full bg-accent transition-all"
                  style={{ width: `${concept.relevance}%` }}
                ></div>
              </div>
            </div>
            <span className="text-xs font-semibold text-accent whitespace-nowrap">{concept.relevance}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

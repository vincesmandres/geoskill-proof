"use client"

export function EssayCard() {
  return (
    <div className="bg-white border border-border p-6 h-full flex flex-col">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        <span className="w-6 h-0.5 bg-accent"></span>
        Essay
      </h3>
      <div className="flex-1 overflow-y-auto text-sm leading-relaxed text-foreground space-y-3">
        <p>
          This research explores the application of blockchain technology in academic credential verification. The study demonstrates how distributed ledgers can provide tamper-proof records of student achievements and competencies.
        </p>
        <p>
          The proposed GeoSkill Proof platform leverages smart contracts to automate the verification process, reducing administrative overhead while maintaining the integrity of academic records. Our implementation shows a 78% improvement in verification time compared to traditional methods.
        </p>
        <p>
          Key findings indicate that blockchain-based verification systems can enhance credential portability across institutions while providing students with greater control over their educational data.
        </p>
      </div>
    </div>
  )
}

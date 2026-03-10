"use client"

export function VerificationTable() {
  const tableData = [
    {
      id: "TX-2024-001",
      verification: "Completado",
      evidence: "Hash verificado",
      timestamp: "2024-03-15 14:32",
    },
    {
      id: "TX-2024-002",
      verification: "Completado",
      evidence: "Firma válida",
      timestamp: "2024-03-14 09:15",
    },
    {
      id: "TX-2024-003",
      verification: "Pendiente",
      evidence: "Revisión en curso",
      timestamp: "2024-03-13 16:48",
    },
    {
      id: "TX-2024-004",
      verification: "Completado",
      evidence: "Aprobado",
      timestamp: "2024-03-12 11:22",
    },
  ]

  return (
    <div className="overflow-hidden border border-border bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted border-b border-border">
            <th className="font-semibold text-left py-3 px-4 text-muted-foreground">Transaction ID</th>
            <th className="font-semibold text-left py-3 px-4 text-muted-foreground">Verification</th>
            <th className="font-semibold text-left py-3 px-4 text-muted-foreground">Evidence</th>
            <th className="font-semibold text-left py-3 px-4 text-muted-foreground">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id} className="border-b border-border hover:bg-muted/30 transition-colors">
              <td className="py-3 px-4 font-mono text-xs text-foreground">{row.id}</td>
              <td className="py-3 px-4">
                <span className="inline-flex items-center gap-1 text-xs font-medium">
                  <span className={`w-2 h-2 rounded-full ${row.verification === "Completado" ? "bg-green-500" : "bg-yellow-500"}`}></span>
                  {row.verification}
                </span>
              </td>
              <td className="py-3 px-4 text-muted-foreground">{row.evidence}</td>
              <td className="py-3 px-4 text-muted-foreground">{row.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

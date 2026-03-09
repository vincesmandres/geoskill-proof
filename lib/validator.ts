import type { PracticeData, ValidationResult, CostEstimate } from "./types"

// Client-side validation logic (mirrors Python backend)
export function validateGranulometria(data: PracticeData): ValidationResult {
  const masses = data.retainedMasses
  const totalInitSample = data.totalSampleMass
  const panMass = masses[masses.length - 1]

  const totalSampleReal = masses.reduce((a, b) => a + b, 0)
  const finesPercent = (panMass / totalSampleReal) * 100
  const errorPercentage = Math.abs(totalSampleReal - totalInitSample) / totalInitSample * 100

  const validMassBalance = errorPercentage <= 2

  const methodStatus = finesPercent <= 10
    ? "Tamizado adecuado"
    : "Advertencia: >10% de finos, se recomienda sedimentacion complementaria"

  const testStatus = validMassBalance
    ? `Practica valida: error de masa ${errorPercentage.toFixed(2)}%, dentro de tolerancia del 2%.`
    : `Practica invalida: error de masa ${errorPercentage.toFixed(2)}%, supera tolerancia del 2%.`

  const retainedPercentage = masses.map(mass => (mass / totalSampleReal) * 100)

  const cumulativePercentage: number[] = []
  let running = 0
  for (const p of retainedPercentage) {
    running += p
    cumulativePercentage.push(Math.min(running, 100))
  }

  const passingPercentages = cumulativePercentage.map(c => Math.max(0, 100 - c))

  return {
    initialSample: totalInitSample,
    totalSampleReal,
    pError: Number(errorPercentage.toFixed(2)),
    retainedPercentage: retainedPercentage.map(x => Number(x.toFixed(2))),
    cumulativePercentage: cumulativePercentage.map(x => Number(x.toFixed(2))),
    passingPercentages: passingPercentages.map(x => Number(x.toFixed(2))),
    finesPercent: Number(finesPercent.toFixed(2)),
    methodStatus,
    validMassBalance,
    testStatus,
    score: validMassBalance ? 1 : 0,
  }
}

// Cost estimation for Solana transactions
export function estimateCosts(solPrice: number = 150): CostEstimate {
  const transactionFee = 0.000005 // ~5000 lamports base fee
  const rentExempt = 0.00089 // ~890,880 lamports for small account
  const programExecution = 0.00002 // Estimated compute units

  const total = transactionFee + rentExempt + programExecution
  const totalUsd = total * solPrice

  return {
    transactionFee,
    rentExempt,
    programExecution,
    total,
    totalUsd,
  }
}

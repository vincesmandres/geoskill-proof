export interface PracticeData {
  studentId: string
  practiceId: string
  totalSampleMass: number
  retainedMasses: number[]
}

export interface ValidationResult {
  initialSample: number
  totalSampleReal: number
  pError: number
  retainedPercentage: number[]
  cumulativePercentage: number[]
  passingPercentages: number[]
  finesPercent: number
  methodStatus: string
  validMassBalance: boolean
  testStatus: string
  score: number
}

export interface CostEstimate {
  transactionFee: number
  rentExempt: number
  programExecution: number
  total: number
  totalUsd: number
}

export interface Property {
  id: string
  name: string
  address: string
  city: string
  postalCode: string
  purchasePrice: number
  size: number
  yearBuilt: number
  monthlyRent: number
  additionalCosts: number
  renovationCosts: number
  propertyTax: number
  managementCosts: number
  maintenanceCosts: number
  interestRate: number
  loanAmount: number
  loanTerm: number
  landRatio: number // Grundstücksanteil in Prozent
  depreciationRate: number // AfA-Satz in Prozent

  // Berechnete Werte
  totalInvestment: number
  annualRent: number
  annualCosts: number
  annualNetRent: number
  monthlyPayment: number
  annualLoanPayment: number
  cashFlow: number
  grossYield: number
  netYield: number
  pricePerSqm: number
  rentPerSqm: number
  purchasePriceMultiplier: number
  buildingValue: number // Gebäudewert (ohne Grundstück)
  annualDepreciation: number // Jährliche Abschreibung
  taxSavings: number // Steuerersparnis durch Abschreibung
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Property } from "@/lib/types"
import { formatCurrency, formatPercentage } from "@/lib/utils"

interface PropertyMetricsProps {
  property: Property
}

export default function PropertyMetrics({ property }: PropertyMetricsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{property.name || "Immobilienkennzahlen"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Kaufpreis</p>
              <p className="text-2xl font-bold">{formatCurrency(property.purchasePrice)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Preis pro m²</p>
              <p className="text-2xl font-bold">{formatCurrency(property.pricePerSqm)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Rendite</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Brutto-Mietrendite</p>
              <p className="text-2xl font-bold">{formatPercentage(property.grossYield)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Netto-Mietrendite</p>
              <p className="text-2xl font-bold">{formatPercentage(property.netYield)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Mieteinnahmen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Monatliche Kaltmiete</p>
              <p className="text-2xl font-bold">{formatCurrency(property.monthlyRent)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Miete pro m²</p>
              <p className="text-2xl font-bold">{formatCurrency(property.rentPerSqm)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Jährliche Mieteinnahmen</p>
              <p className="text-2xl font-bold">{formatCurrency(property.annualRent)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Kaufpreisfaktor</p>
              <p className="text-2xl font-bold">{property.purchasePriceMultiplier.toFixed(1)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Finanzierung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Monatliche Rate</p>
              <p className="text-2xl font-bold">{formatCurrency(property.monthlyPayment)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Monatlicher Cashflow</p>
              <p className={`text-2xl font-bold ${property.cashFlow >= 0 ? "text-green-600" : "text-red-600"}`}>
                {formatCurrency(property.cashFlow / 12)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Investition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Gesamtinvestition</p>
              <p className="text-2xl font-bold">{formatCurrency(property.totalInvestment)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Eigenkapital</p>
              <p className="text-2xl font-bold">{formatCurrency(property.totalInvestment - property.loanAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Abschreibung (AfA)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Gebäudewert</p>
              <p className="text-2xl font-bold">{formatCurrency(property.buildingValue)}</p>
              <p className="text-xs text-muted-foreground">{100 - property.landRatio}% des Kaufpreises</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Jährliche Abschreibung</p>
              <p className="text-2xl font-bold">{formatCurrency(property.annualDepreciation)}</p>
              <p className="text-xs text-muted-foreground">{property.depreciationRate}% des Gebäudewerts</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Steuerersparnis (ca.)</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(property.taxSavings)}</p>
              <p className="text-xs text-muted-foreground">Bei angenommenem Steuersatz von 42%</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Cashflow nach Steuern (ca.)</p>
              <p
                className={`text-2xl font-bold ${property.cashFlow + property.taxSavings >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {formatCurrency((property.cashFlow + property.taxSavings) / 12)}/Monat
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Property } from "@/lib/types"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { Trash2 } from "lucide-react"

interface PropertyComparisonProps {
  properties: Property[]
  onRemoveProperty: (id: string) => void
}

export default function PropertyComparison({ properties, onRemoveProperty }: PropertyComparisonProps) {
  if (properties.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center p-6 min-h-[300px]">
          <p className="text-muted-foreground text-center">
            Keine Immobilien zum Vergleich vorhanden. Fügen Sie Immobilien über den Immobilienrechner hinzu.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Immobilienvergleich</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Immobilie</TableHead>
                <TableHead>Kaufpreis</TableHead>
                <TableHead>Preis/m²</TableHead>
                <TableHead>Miete/m²</TableHead>
                <TableHead>Brutto-Rendite</TableHead>
                <TableHead>Netto-Rendite</TableHead>
                <TableHead>Cashflow</TableHead>
                <TableHead>AfA/Jahr</TableHead>
                <TableHead>Kaufpreisfaktor</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">
                    {property.name || `${property.address}, ${property.city}`}
                  </TableCell>
                  <TableCell>{formatCurrency(property.purchasePrice)}</TableCell>
                  <TableCell>{formatCurrency(property.pricePerSqm)}</TableCell>
                  <TableCell>{formatCurrency(property.rentPerSqm)}</TableCell>
                  <TableCell>{formatPercentage(property.grossYield)}</TableCell>
                  <TableCell>{formatPercentage(property.netYield)}</TableCell>
                  <TableCell className={property.cashFlow >= 0 ? "text-green-600" : "text-red-600"}>
                    {formatCurrency(property.cashFlow / 12)}/Monat
                  </TableCell>
                  <TableCell>{formatCurrency(property.annualDepreciation)}</TableCell>
                  <TableCell>{property.purchasePriceMultiplier.toFixed(1)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => onRemoveProperty(property.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}


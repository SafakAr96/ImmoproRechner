"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import type { Property } from "@/lib/types"
import PropertyMetrics from "./property-metrics"

const propertyFormSchema = z.object({
  name: z.string().min(1, "Name ist erforderlich"),
  address: z.string().min(1, "Adresse ist erforderlich"),
  city: z.string().min(1, "Stadt ist erforderlich"),
  postalCode: z.string().min(5, "Gültige Postleitzahl erforderlich"),
  purchasePrice: z.coerce.number().positive("Muss größer als 0 sein"),
  size: z.coerce.number().positive("Muss größer als 0 sein"),
  yearBuilt: z.coerce.number().int().positive("Muss größer als 0 sein"),
  monthlyRent: z.coerce.number().nonnegative(),
  additionalCosts: z.coerce.number().nonnegative(),
  renovationCosts: z.coerce.number().nonnegative(),
  propertyTax: z.coerce.number().nonnegative(),
  managementCosts: z.coerce.number().nonnegative(),
  maintenanceCosts: z.coerce.number().nonnegative(),
  interestRate: z.coerce.number().nonnegative(),
  loanAmount: z.coerce.number().nonnegative(),
  loanTerm: z.coerce.number().int().nonnegative(),
  landRatio: z.coerce.number().min(0).max(100, "Muss zwischen 0 und 100 sein"),
  depreciationRate: z.coerce.number().min(0).max(10, "Muss zwischen 0 und 10 sein"),
})

type PropertyFormValues = z.infer<typeof propertyFormSchema>

interface PropertyFormProps {
  onAddProperty: (property: Property) => void
}

export default function PropertyForm({ onAddProperty }: PropertyFormProps) {
  const [calculatedProperty, setCalculatedProperty] = useState<Property | null>(null)

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      postalCode: "",
      purchasePrice: 300000,
      size: 80,
      yearBuilt: 1990,
      monthlyRent: 1000,
      additionalCosts: 30000, // Kaufnebenkosten (ca. 10%)
      renovationCosts: 0,
      propertyTax: 300, // Grundsteuer pro Jahr
      managementCosts: 0,
      maintenanceCosts: 1200, // Instandhaltungsrücklage pro Jahr
      interestRate: 3.5, // Zinssatz in %
      loanAmount: 240000, // 80% Finanzierung
      loanTerm: 30, // Laufzeit in Jahren
      landRatio: 20, // Grundstücksanteil in % (Standard: 20%)
      depreciationRate: 2, // AfA-Satz in % (Standard: 2%)
    },
  })

  function calculateMetrics(data: PropertyFormValues): Property {
    // Berechnung der Kennzahlen
    const totalInvestment = data.purchasePrice + data.additionalCosts + data.renovationCosts
    const annualRent = data.monthlyRent * 12
    const annualCosts = data.propertyTax + data.managementCosts + data.maintenanceCosts
    const annualNetRent = annualRent - annualCosts

    // Berechnung der monatlichen Kreditrate
    const monthlyInterestRate = data.interestRate / 100 / 12
    const numberOfPayments = data.loanTerm * 12
    const monthlyPayment =
      (data.loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)

    const annualLoanPayment = monthlyPayment * 12
    const cashFlow = annualNetRent - annualLoanPayment
    const grossYield = (annualRent / totalInvestment) * 100
    const netYield = (annualNetRent / totalInvestment) * 100
    const pricePerSqm = data.purchasePrice / data.size
    const rentPerSqm = data.monthlyRent / data.size
    const purchasePriceMultiplier = data.purchasePrice / annualRent

    // Berechnung der Abschreibung
    const buildingValue = data.purchasePrice * (1 - data.landRatio / 100)
    const annualDepreciation = buildingValue * (data.depreciationRate / 100)

    // Annahme eines Steuersatzes von 42% für die Berechnung der Steuerersparnis
    const taxRate = 0.42
    const taxSavings = annualDepreciation * taxRate

    return {
      ...data,
      id: Date.now().toString(),
      totalInvestment,
      annualRent,
      annualCosts,
      annualNetRent,
      monthlyPayment,
      annualLoanPayment,
      cashFlow,
      grossYield,
      netYield,
      pricePerSqm,
      rentPerSqm,
      purchasePriceMultiplier,
      buildingValue,
      annualDepreciation,
      taxSavings,
    }
  }

  function onSubmit(data: PropertyFormValues) {
    const propertyWithMetrics = calculateMetrics(data)
    setCalculatedProperty(propertyWithMetrics)
  }

  function handleAddProperty() {
    if (calculatedProperty) {
      onAddProperty(calculatedProperty)
      form.reset()
      setCalculatedProperty(null)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Immobiliendaten</CardTitle>
          <CardDescription>
            Geben Sie die Daten Ihrer Immobilie ein, um die wichtigsten Kennzahlen zu berechnen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Allgemeine Informationen</h3>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bezeichnung</FormLabel>
                      <FormControl>
                        <Input placeholder="z.B. Wohnung Musterstraße" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Input placeholder="Straße und Hausnummer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PLZ</FormLabel>
                        <FormControl>
                          <Input placeholder="z.B. 10115" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stadt</FormLabel>
                        <FormControl>
                          <Input placeholder="z.B. Berlin" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Immobiliendetails</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="purchasePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kaufpreis (€)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wohnfläche (m²)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="yearBuilt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Baujahr</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="monthlyRent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monatliche Kaltmiete (€)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Kosten</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="additionalCosts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kaufnebenkosten (€)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>Grunderwerbsteuer, Notar, Makler, etc.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="renovationCosts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Renovierungskosten (€)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="propertyTax"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grundsteuer (€/Jahr)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="managementCosts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verwaltung (€/Jahr)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maintenanceCosts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instandhaltung (€/Jahr)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Finanzierung</h3>
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="loanAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Darlehensbetrag (€)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zinssatz (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="loanTerm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Laufzeit (Jahre)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Abschreibung (AfA)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="landRatio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grundstücksanteil (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="1" min="0" max="100" {...field} />
                        </FormControl>
                        <FormDescription>Anteil des Grundstücks am Kaufpreis</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="depreciationRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>AfA-Satz (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" min="0" max="10" {...field} />
                        </FormControl>
                        <FormDescription>Standardmäßig 2% für Gebäude nach 1924</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Berechnen
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div>
        {calculatedProperty ? (
          <div className="space-y-6">
            <PropertyMetrics property={calculatedProperty} />
            <Button onClick={handleAddProperty} className="w-full">
              Zum Vergleich hinzufügen
            </Button>
          </div>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent className="text-center p-6">
              <p className="text-muted-foreground">
                Füllen Sie das Formular aus und klicken Sie auf "Berechnen", um die Kennzahlen Ihrer Immobilie zu sehen.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


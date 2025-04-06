"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PropertyForm from "./property-form"
import PropertyComparison from "./property-comparison"
import PropertyMap from "./property-map"
import type { Property } from "@/lib/types"

export default function RealEstateCalculator() {
  const [properties, setProperties] = useState<Property[]>([])

  const addProperty = (property: Property) => {
    setProperties((prev) => [...prev, { ...property, id: Date.now().toString() }])
  }

  const removeProperty = (id: string) => {
    setProperties((prev) => prev.filter((property) => property.id !== id))
  }

  return (
    <Tabs defaultValue="calculator" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="calculator">Immobilienrechner</TabsTrigger>
        <TabsTrigger value="comparison">Immobilienvergleich</TabsTrigger>
        <TabsTrigger value="map">Karte & Preise</TabsTrigger>
      </TabsList>

      <TabsContent value="calculator">
        <PropertyForm onAddProperty={addProperty} />
      </TabsContent>

      <TabsContent value="comparison">
        <PropertyComparison properties={properties} onRemoveProperty={removeProperty} />
      </TabsContent>

      <TabsContent value="map">
        <PropertyMap properties={properties} />
      </TabsContent>
    </Tabs>
  )
}


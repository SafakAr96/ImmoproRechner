"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Property } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { Search } from "lucide-react"

interface PropertyMapProps {
  properties: Property[]
}

export default function PropertyMap({ properties }: PropertyMapProps) {
  const [searchLocation, setSearchLocation] = useState("")
  const [locationData, setLocationData] = useState<{
    averagePrice: number
    priceRange: [number, number]
    averageRent: number
    rentRange: [number, number]
  } | null>(null)

  // Diese Funktion würde normalerweise eine API abfragen, um echte Daten zu erhalten
  const fetchLocationData = (location: string) => {
    // Simulierte Daten für verschiedene Städte
    const cityData: Record<string, any> = {
      berlin: {
        averagePrice: 5200,
        priceRange: [3800, 7500],
        averageRent: 14.5,
        rentRange: [10.5, 22.0],
      },
      münchen: {
        averagePrice: 9800,
        priceRange: [7500, 15000],
        averageRent: 22.8,
        rentRange: [18.5, 35.0],
      },
      hamburg: {
        averagePrice: 5800,
        priceRange: [4200, 8500],
        averageRent: 16.2,
        rentRange: [12.0, 24.0],
      },
      köln: {
        averagePrice: 4900,
        priceRange: [3500, 7000],
        averageRent: 13.8,
        rentRange: [10.0, 20.0],
      },
      frankfurt: {
        averagePrice: 6500,
        priceRange: [4800, 9500],
        averageRent: 17.5,
        rentRange: [13.5, 26.0],
      },
      düsseldorf: {
        averagePrice: 5500,
        priceRange: [4000, 8000],
        averageRent: 15.3,
        rentRange: [11.5, 23.0],
      },
      stuttgart: {
        averagePrice: 5900,
        priceRange: [4300, 8600],
        averageRent: 16.8,
        rentRange: [12.5, 25.0],
      },
      leipzig: {
        averagePrice: 3200,
        priceRange: [2200, 4800],
        averageRent: 8.9,
        rentRange: [6.5, 13.5],
      },
      dresden: {
        averagePrice: 3100,
        priceRange: [2100, 4600],
        averageRent: 8.7,
        rentRange: [6.3, 13.0],
      },
    }

    // Normalisiere den Suchbegriff für den Vergleich
    const normalizedSearch = location.toLowerCase().trim()

    // Suche nach der Stadt in den Daten
    for (const city in cityData) {
      if (normalizedSearch.includes(city)) {
        return cityData[city]
      }
    }

    // Fallback: Zufällige Daten, wenn keine Stadt gefunden wurde
    return {
      averagePrice: Math.floor(Math.random() * 5000) + 3000,
      priceRange: [Math.floor(Math.random() * 3000) + 2000, Math.floor(Math.random() * 5000) + 5000],
      averageRent: Math.floor(Math.random() * 10) + 8 + Math.random().toFixed(1),
      rentRange: [
        Math.floor(Math.random() * 5) + 6 + Math.random().toFixed(1),
        Math.floor(Math.random() * 10) + 15 + Math.random().toFixed(1),
      ],
    }
  }

  const handleSearch = () => {
    if (searchLocation.trim()) {
      const data = fetchLocationData(searchLocation)
      setLocationData(data)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Immobilienpreise nach Standort</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-6">
            <Input
              placeholder="Ort eingeben (z.B. Berlin, München, Hamburg)"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Suchen
            </Button>
          </div>

          {locationData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Durchschnittlicher Kaufpreis pro m²</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatCurrency(locationData.averagePrice)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Preisspanne: {formatCurrency(locationData.priceRange[0])} -{" "}
                    {formatCurrency(locationData.priceRange[1])}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Durchschnittliche Miete pro m²</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{formatCurrency(locationData.averageRent)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Mietspanne: {formatCurrency(locationData.rentRange[0])} -{" "}
                    {formatCurrency(locationData.rentRange[1])}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Karte</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[400px] bg-gray-100 rounded-md flex items-center justify-center">
            <div className="text-center p-6">
              <p className="text-muted-foreground mb-2">Google Maps Integration</p>
              <p className="text-sm text-muted-foreground">
                Für die vollständige Kartenintegration wird ein Google Maps API-Schlüssel benötigt. In einer produktiven
                Anwendung würde hier eine interaktive Karte mit Immobilienstandorten angezeigt werden.
              </p>
            </div>
          </div>

          {properties.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Ihre Immobilien</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.map((property) => (
                  <Card key={property.id}>
                    <CardContent className="p-4">
                      <p className="font-medium">{property.name || `${property.address}`}</p>
                      <p className="text-sm text-muted-foreground">
                        {property.postalCode} {property.city}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Kaufpreis/m²</p>
                          <p className="font-medium">{formatCurrency(property.pricePerSqm)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Miete/m²</p>
                          <p className="font-medium">{formatCurrency(property.rentPerSqm)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


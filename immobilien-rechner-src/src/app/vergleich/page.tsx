import React from 'react';
import { ImmobilienVergleichsProvider } from '@/lib/immobilien-vergleich-context';
import { ImmobilienVergleichsTable } from '@/components/immobilien-vergleichs-table';
import { RenditeVergleichsChart } from '@/components/charts/rendite-vergleichs-chart';
import { CashflowVergleichsChart } from '@/components/charts/cashflow-vergleichs-chart';
import { useImmobilienVergleich } from '@/lib/immobilien-vergleich-context';
import { Button } from '@/components/ui/button';

export default function VergleichsSeite() {
  const { immobilien } = useImmobilienVergleich();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Immobilien-Vergleich</h1>
      
      <div className="mb-8">
        <ImmobilienVergleichsTable />
      </div>
      
      {immobilien.length >= 2 ? (
        <div className="space-y-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <RenditeVergleichsChart immobilien={immobilien} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CashflowVergleichsChart immobilien={immobilien} />
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Mindestens zwei Immobilien für Vergleich benötigt</h3>
          <p className="text-gray-500 mb-4">
            Speichern Sie mindestens zwei Immobilienberechnungen, um sie grafisch vergleichen zu können.
          </p>
          <Button 
            onClick={() => window.location.href = '/'}
          >
            Neue Berechnung starten
          </Button>
        </div>
      )}
    </div>
  );
}

export function VergleichsSeiteWrapper() {
  return (
    <ImmobilienVergleichsProvider>
      <VergleichsSeite />
    </ImmobilienVergleichsProvider>
  );
}

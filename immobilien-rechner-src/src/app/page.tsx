import React from 'react';
import { ImmobiliendatenForm, ImmobiliendatenFormData } from '@/components/forms/immobiliendaten-form';
import { FinanzierungsdatenForm, FinanzierungsdatenFormData } from '@/components/forms/finanzierungsdaten-form';
import { MietdatenForm, MietdatenFormData } from '@/components/forms/mietdaten-form';
import { berechneWirtschaftlichkeit } from '@/lib/berechnungen';
import { ErgebnisUebersicht } from '@/components/ergebnis-uebersicht';
import { RenditeVergleichChart } from '@/components/charts/rendite-vergleich-chart';
import { CashflowEntwicklungChart } from '@/components/charts/cashflow-entwicklung-chart';
import { KostenaufteilungChart } from '@/components/charts/kostenaufteilung-chart';
import { TilgungsverlaufChart } from '@/components/charts/tilgungsverlauf-chart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImmobilienVergleichsProvider, useImmobilienVergleich } from '@/lib/immobilien-vergleich-context';
import Link from 'next/link';

function HomeContent() {
  const [step, setStep] = React.useState(1);
  const [immobiliendaten, setImmobiliendaten] = React.useState<ImmobiliendatenFormData | null>(null);
  const [finanzierungsdaten, setFinanzierungsdaten] = React.useState<FinanzierungsdatenFormData | null>(null);
  const [mietdaten, setMietdaten] = React.useState<MietdatenFormData | null>(null);
  const [ergebnis, setErgebnis] = React.useState<any>(null);
  const [immobilienName, setImmobilienName] = React.useState('');
  const [showSaveDialog, setShowSaveDialog] = React.useState(false);
  
  const { addImmobilie } = useImmobilienVergleich();

  const handleImmobiliendatenSubmit = (data: ImmobiliendatenFormData) => {
    setImmobiliendaten(data);
    setStep(2);
  };

  const handleFinanzierungsdatenSubmit = (data: FinanzierungsdatenFormData) => {
    setFinanzierungsdaten(data);
    setStep(3);
  };

  const handleMietdatenSubmit = (data: MietdatenFormData) => {
    setMietdaten(data);
    
    // Berechnung durchführen, wenn alle Daten vorhanden sind
    if (immobiliendaten && finanzierungsdaten) {
      const ergebnis = berechneWirtschaftlichkeit(immobiliendaten, finanzierungsdaten, data);
      setErgebnis(ergebnis);
      setStep(4);
    }
  };

  const handleBackToImmobiliendaten = () => {
    setStep(1);
  };

  const handleBackToFinanzierungsdaten = () => {
    setStep(2);
  };

  const handleReset = () => {
    setStep(1);
    setImmobiliendaten(null);
    setFinanzierungsdaten(null);
    setMietdaten(null);
    setErgebnis(null);
    setShowSaveDialog(false);
  };

  const handleSaveToComparison = () => {
    if (immobilienName.trim() === '') {
      setImmobilienName(`Immobilie ${new Date().toLocaleDateString()}`);
    }
    
    if (immobiliendaten && finanzierungsdaten && mietdaten && ergebnis) {
      addImmobilie(
        immobilienName,
        immobiliendaten,
        finanzierungsdaten,
        mietdaten,
        ergebnis
      );
      
      setShowSaveDialog(false);
      setImmobilienName('');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center">Immobilien-Wirtschaftlichkeitsrechner</h1>
          <Link href="/vergleich">
            <Button variant="outline">Zum Immobilien-Vergleich</Button>
          </Link>
        </div>
        
        {step < 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <div className="ml-2">Immobiliendaten</div>
              </div>
              <div className="h-0.5 w-12 bg-gray-200"></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <div className="ml-2">Finanzierung</div>
              </div>
              <div className="h-0.5 w-12 bg-gray-200"></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <div className="ml-2">Mietdaten</div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          {step === 1 && (
            <ImmobiliendatenForm 
              onSubmit={handleImmobiliendatenSubmit} 
            />
          )}
          
          {step === 2 && immobiliendaten && (
            <FinanzierungsdatenForm 
              onSubmit={handleFinanzierungsdatenSubmit}
              onBack={handleBackToImmobiliendaten}
              kaufpreis={immobiliendaten.kaufpreis}
              nebenkosten={
                immobiliendaten.kaufpreis * (
                  immobiliendaten.grunderwerbsteuer + 
                  immobiliendaten.notarkosten + 
                  immobiliendaten.maklerprovision + 
                  immobiliendaten.grundbuchkosten
                ) / 100
              }
            />
          )}
          
          {step === 3 && immobiliendaten && finanzierungsdaten && (
            <MietdatenForm 
              onSubmit={handleMietdatenSubmit}
              onBack={handleBackToFinanzierungsdaten}
            />
          )}
          
          {step === 4 && ergebnis && (
            <div className="space-y-8">
              <ErgebnisUebersicht ergebnis={ergebnis} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <RenditeVergleichChart 
                  bruttorendite={ergebnis.bruttorendite}
                  nettorendite={ergebnis.nettorendite}
                  eigenkapitalrendite={ergebnis.eigenkapitalrendite}
                  objektrendite={ergebnis.objektrendite}
                />
                
                <CashflowEntwicklungChart 
                  jaehrlicherCashflow={ergebnis.jaehrlicherCashflow}
                  mietsteigerung={mietdaten?.mietsteigerung || 2}
                  jahre={30}
                />
                
                <KostenaufteilungChart 
                  kaufpreis={ergebnis.kaufpreis}
                  grunderwerbsteuer={ergebnis.grunderwerbsteuer}
                  notarkosten={ergebnis.notarkosten}
                  maklerprovision={ergebnis.maklerprovision}
                  grundbuchkosten={ergebnis.grundbuchkosten}
                />
                
                <TilgungsverlaufChart 
                  darlehensBetrag={ergebnis.fremdkapital}
                  zinssatz={ergebnis.zinssatz}
                  tilgungssatz={ergebnis.tilgungssatz}
                  laufzeit={30}
                />
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="px-6 py-3"
                >
                  Neue Berechnung starten
                </Button>
                
                <Button
                  onClick={() => setShowSaveDialog(true)}
                  className="px-6 py-3"
                >
                  Zum Vergleich hinzufügen
                </Button>
              </div>
              
              {showSaveDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h3 className="text-xl font-semibold mb-4">Immobilie speichern</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="immobilienName">Name der Immobilie</Label>
                        <Input
                          id="immobilienName"
                          value={immobilienName}
                          onChange={(e) => setImmobilienName(e.target.value)}
                          placeholder="z.B. Wohnung Berlin Mitte"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowSaveDialog(false)}
                        >
                          Abbrechen
                        </Button>
                        <Button
                          onClick={handleSaveToComparison}
                        >
                          Speichern
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <ImmobilienVergleichsProvider>
      <HomeContent />
    </ImmobilienVergleichsProvider>
  );
}

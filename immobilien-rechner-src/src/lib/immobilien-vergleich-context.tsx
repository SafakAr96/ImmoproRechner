import React from 'react';
import { ImmobiliendatenFormData } from '@/components/forms/immobiliendaten-form';
import { FinanzierungsdatenFormData } from '@/components/forms/finanzierungsdaten-form';
import { MietdatenFormData } from '@/components/forms/mietdaten-form';
import { WirtschaftlichkeitsBerechnung } from '@/lib/berechnungen';

export interface ImmobilienVergleichsItem {
  id: string;
  name: string;
  immobiliendaten: ImmobiliendatenFormData;
  finanzierungsdaten: FinanzierungsdatenFormData;
  mietdaten: MietdatenFormData;
  ergebnis: WirtschaftlichkeitsBerechnung;
}

export interface ImmobilienVergleichsContext {
  immobilien: ImmobilienVergleichsItem[];
  addImmobilie: (
    name: string,
    immobiliendaten: ImmobiliendatenFormData,
    finanzierungsdaten: FinanzierungsdatenFormData,
    mietdaten: MietdatenFormData,
    ergebnis: WirtschaftlichkeitsBerechnung
  ) => void;
  removeImmobilie: (id: string) => void;
  clearImmobilien: () => void;
}

const ImmobilienVergleichsContext = React.createContext<ImmobilienVergleichsContext>({
  immobilien: [],
  addImmobilie: () => {},
  removeImmobilie: () => {},
  clearImmobilien: () => {},
});

export const ImmobilienVergleichsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [immobilien, setImmobilien] = React.useState<ImmobilienVergleichsItem[]>([]);

  const addImmobilie = (
    name: string,
    immobiliendaten: ImmobiliendatenFormData,
    finanzierungsdaten: FinanzierungsdatenFormData,
    mietdaten: MietdatenFormData,
    ergebnis: WirtschaftlichkeitsBerechnung
  ) => {
    const newImmobilie: ImmobilienVergleichsItem = {
      id: Date.now().toString(),
      name,
      immobiliendaten,
      finanzierungsdaten,
      mietdaten,
      ergebnis,
    };

    setImmobilien((prev) => [...prev, newImmobilie]);
  };

  const removeImmobilie = (id: string) => {
    setImmobilien((prev) => prev.filter((immobilie) => immobilie.id !== id));
  };

  const clearImmobilien = () => {
    setImmobilien([]);
  };

  return (
    <ImmobilienVergleichsContext.Provider
      value={{
        immobilien,
        addImmobilie,
        removeImmobilie,
        clearImmobilien,
      }}
    >
      {children}
    </ImmobilienVergleichsContext.Provider>
  );
};

export const useImmobilienVergleich = () => React.useContext(ImmobilienVergleichsContext);

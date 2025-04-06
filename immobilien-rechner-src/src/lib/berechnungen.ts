import { ImmobiliendatenFormData } from '@/components/forms/immobiliendaten-form';
import { FinanzierungsdatenFormData } from '@/components/forms/finanzierungsdaten-form';
import { MietdatenFormData } from '@/components/forms/mietdaten-form';

export interface WirtschaftlichkeitsBerechnung {
  // Renditekennzahlen
  bruttorendite: number;
  nettorendite: number;
  eigenkapitalrendite: number;
  objektrendite: number;
  
  // Cashflow-Kennzahlen
  monatlicheRate: number;
  jaehrlicheRate: number;
  monatlicherCashflow: number;
  jaehrlicherCashflow: number;
  
  // Kaufpreiskennzahlen
  gesamtkosten: number;
  kaufpreis: number;
  kaufnebenkosten: number;
  grunderwerbsteuer: number;
  notarkosten: number;
  maklerprovision: number;
  grundbuchkosten: number;
  
  // Finanzierungskennzahlen
  eigenkapital: number;
  fremdkapital: number;
  zinssatz: number;
  tilgungssatz: number;
  anfaenglicheMonatsrate: number;
  tilgungsdauer: number;
  
  // Mietkennzahlen
  jahreskaltmiete: number;
  jahresnebenkosten: number;
  mieteinnahmenProQm: number;
  effektiveMieteinnahmen: number;
  
  // Bewirtschaftungskennzahlen
  verwaltungskosten: number;
  instandhaltungskosten: number;
  ruecklage: number;
  gesamtbewirtschaftungskosten: number;
  
  // Leverage-Effekt
  leverageEffekt: number;
}

export function berechneWirtschaftlichkeit(
  immobiliendaten: ImmobiliendatenFormData,
  finanzierungsdaten: FinanzierungsdatenFormData,
  mietdaten: MietdatenFormData
): WirtschaftlichkeitsBerechnung {
  // Kaufpreiskennzahlen berechnen
  const kaufpreis = immobiliendaten.kaufpreis;
  const grunderwerbsteuer = kaufpreis * (immobiliendaten.grunderwerbsteuer / 100);
  const notarkosten = kaufpreis * (immobiliendaten.notarkosten / 100);
  const maklerprovision = kaufpreis * (immobiliendaten.maklerprovision / 100);
  const grundbuchkosten = kaufpreis * (immobiliendaten.grundbuchkosten / 100);
  const kaufnebenkosten = grunderwerbsteuer + notarkosten + maklerprovision + grundbuchkosten;
  const gesamtkosten = kaufpreis + kaufnebenkosten;
  
  // Finanzierungskennzahlen berechnen
  const eigenkapital = finanzierungsdaten.eigenkapital;
  const fremdkapital = finanzierungsdaten.darlehensBetrag;
  const zinssatz = finanzierungsdaten.zinssatz / 100;
  const tilgungssatz = finanzierungsdaten.tilgungssatz / 100;
  const anfaenglicheJahresrate = fremdkapital * (zinssatz + tilgungssatz);
  const anfaenglicheMonatsrate = anfaenglicheJahresrate / 12;
  
  // Tilgungsdauer berechnen (vereinfacht)
  const tilgungsdauer = Math.log(anfaenglicheJahresrate / (fremdkapital * tilgungssatz)) / Math.log(1 + tilgungssatz);
  
  // Mietkennzahlen berechnen
  const monatlicheKaltmiete = mietdaten.kaltmiete;
  const jahreskaltmiete = monatlicheKaltmiete * 12;
  const jahresnebenkosten = mietdaten.nebenkosten * 12;
  const mieteinnahmenProQm = mietdaten.mieteinnahmenProQm;
  
  // Leerstandsabzug berücksichtigen
  const leerstandsrate = mietdaten.leerstandsrate / 100;
  const effektiveMieteinnahmen = jahreskaltmiete * (1 - leerstandsrate);
  
  // Bewirtschaftungskennzahlen berechnen
  const verwaltungskosten = jahreskaltmiete * (mietdaten.verwaltungskosten / 100);
  const instandhaltungskosten = kaufpreis * (mietdaten.instandhaltungskosten / 100);
  const ruecklage = kaufpreis * (mietdaten.ruecklage / 100);
  const gesamtbewirtschaftungskosten = verwaltungskosten + instandhaltungskosten + ruecklage;
  
  // Renditekennzahlen berechnen
  const bruttorendite = (jahreskaltmiete / kaufpreis) * 100;
  const nettorendite = ((effektiveMieteinnahmen - gesamtbewirtschaftungskosten) / gesamtkosten) * 100;
  
  // Cashflow berechnen
  const jaehrlicheRate = anfaenglicheJahresrate;
  const monatlicheRate = anfaenglicheMonatsrate;
  const jaehrlicherCashflow = effektiveMieteinnahmen - gesamtbewirtschaftungskosten - jaehrlicheRate;
  const monatlicherCashflow = jaehrlicherCashflow / 12;
  
  // Objektrendite (ohne Berücksichtigung der Finanzierung)
  const objektrendite = ((effektiveMieteinnahmen - gesamtbewirtschaftungskosten) / kaufpreis) * 100;
  
  // Eigenkapitalrendite
  const eigenkapitalrendite = ((effektiveMieteinnahmen - gesamtbewirtschaftungskosten - (fremdkapital * zinssatz)) / eigenkapital) * 100;
  
  // Leverage-Effekt (Differenz zwischen Eigenkapitalrendite und Objektrendite)
  const leverageEffekt = eigenkapitalrendite - objektrendite;
  
  return {
    bruttorendite,
    nettorendite,
    eigenkapitalrendite,
    objektrendite,
    
    monatlicheRate,
    jaehrlicheRate,
    monatlicherCashflow,
    jaehrlicherCashflow,
    
    gesamtkosten,
    kaufpreis,
    kaufnebenkosten,
    grunderwerbsteuer,
    notarkosten,
    maklerprovision,
    grundbuchkosten,
    
    eigenkapital,
    fremdkapital,
    zinssatz: finanzierungsdaten.zinssatz,
    tilgungssatz: finanzierungsdaten.tilgungssatz,
    anfaenglicheMonatsrate,
    tilgungsdauer,
    
    jahreskaltmiete,
    jahresnebenkosten,
    mieteinnahmenProQm,
    effektiveMieteinnahmen,
    
    verwaltungskosten,
    instandhaltungskosten,
    ruecklage,
    gesamtbewirtschaftungskosten,
    
    leverageEffekt
  };
}

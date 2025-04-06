import React from 'react';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { WirtschaftlichkeitsBerechnung } from '@/lib/berechnungen';

interface ErgebnisUebersichtProps {
  ergebnis: WirtschaftlichkeitsBerechnung;
}

export function ErgebnisUebersicht({ ergebnis }: ErgebnisUebersichtProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Ergebnisübersicht</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Renditekennzahlen */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Renditekennzahlen</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Bruttorendite:</span>
              <span className="font-medium">{ergebnis.bruttorendite.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nettorendite:</span>
              <span className="font-medium">{ergebnis.nettorendite.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Eigenkapitalrendite:</span>
              <span className="font-medium">{ergebnis.eigenkapitalrendite.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Objektrendite:</span>
              <span className="font-medium">{ergebnis.objektrendite.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-600">Leverage-Effekt:</span>
              <span className={`font-medium ${ergebnis.leverageEffekt >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {ergebnis.leverageEffekt.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Cashflow-Kennzahlen */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Cashflow</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Monatliche Rate:</span>
              <span className="font-medium">{formatCurrency(ergebnis.monatlicheRate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Jährliche Rate:</span>
              <span className="font-medium">{formatCurrency(ergebnis.jaehrlicheRate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monatlicher Cashflow:</span>
              <span className={`font-medium ${ergebnis.monatlicherCashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(ergebnis.monatlicherCashflow)}
              </span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-600">Jährlicher Cashflow:</span>
              <span className={`font-medium ${ergebnis.jaehrlicherCashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(ergebnis.jaehrlicherCashflow)}
              </span>
            </div>
          </div>
        </div>

        {/* Kaufpreiskennzahlen */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Kaufpreiskennzahlen</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Kaufpreis:</span>
              <span className="font-medium">{formatCurrency(ergebnis.kaufpreis)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Grunderwerbsteuer:</span>
              <span className="font-medium">{formatCurrency(ergebnis.grunderwerbsteuer)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Notarkosten:</span>
              <span className="font-medium">{formatCurrency(ergebnis.notarkosten)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Maklerprovision:</span>
              <span className="font-medium">{formatCurrency(ergebnis.maklerprovision)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Grundbuchkosten:</span>
              <span className="font-medium">{formatCurrency(ergebnis.grundbuchkosten)}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-600">Gesamtkosten:</span>
              <span className="font-medium">{formatCurrency(ergebnis.gesamtkosten)}</span>
            </div>
          </div>
        </div>

        {/* Finanzierungskennzahlen */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Finanzierungskennzahlen</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Eigenkapital:</span>
              <span className="font-medium">{formatCurrency(ergebnis.eigenkapital)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fremdkapital:</span>
              <span className="font-medium">{formatCurrency(ergebnis.fremdkapital)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Zinssatz:</span>
              <span className="font-medium">{ergebnis.zinssatz}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tilgungssatz:</span>
              <span className="font-medium">{ergebnis.tilgungssatz}%</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-600">Tilgungsdauer:</span>
              <span className="font-medium">{Math.round(ergebnis.tilgungsdauer)} Jahre</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

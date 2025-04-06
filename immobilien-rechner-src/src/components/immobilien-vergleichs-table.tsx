import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImmobilienVergleichsItem, useImmobilienVergleich } from '@/lib/immobilien-vergleich-context';
import { formatCurrency } from '@/lib/utils';

interface ImmobilienVergleichsTableProps {
  onItemClick?: (id: string) => void;
}

export function ImmobilienVergleichsTable({ onItemClick }: ImmobilienVergleichsTableProps) {
  const { immobilien, removeImmobilie } = useImmobilienVergleich();

  if (immobilien.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Keine Immobilien zum Vergleich</h3>
        <p className="text-gray-500">
          Speichern Sie Immobilienberechnungen, um sie hier zu vergleichen.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left font-medium">Name</th>
            <th className="p-3 text-left font-medium">Kaufpreis</th>
            <th className="p-3 text-left font-medium">Eigenkapital</th>
            <th className="p-3 text-left font-medium">Bruttorendite</th>
            <th className="p-3 text-left font-medium">Nettorendite</th>
            <th className="p-3 text-left font-medium">Eigenkapitalrendite</th>
            <th className="p-3 text-left font-medium">Cashflow (mtl.)</th>
            <th className="p-3 text-left font-medium">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {immobilien.map((immobilie) => (
            <tr 
              key={immobilie.id} 
              className="border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => onItemClick && onItemClick(immobilie.id)}
            >
              <td className="p-3">{immobilie.name}</td>
              <td className="p-3">{formatCurrency(immobilie.ergebnis.kaufpreis)}</td>
              <td className="p-3">{formatCurrency(immobilie.ergebnis.eigenkapital)}</td>
              <td className="p-3">{immobilie.ergebnis.bruttorendite.toFixed(2)}%</td>
              <td className="p-3">{immobilie.ergebnis.nettorendite.toFixed(2)}%</td>
              <td className="p-3">{immobilie.ergebnis.eigenkapitalrendite.toFixed(2)}%</td>
              <td className="p-3">
                <span className={immobilie.ergebnis.monatlicherCashflow >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(immobilie.ergebnis.monatlicherCashflow)}
                </span>
              </td>
              <td className="p-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImmobilie(immobilie.id);
                  }}
                >
                  Entfernen
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

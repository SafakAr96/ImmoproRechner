import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from 'recharts';
import { ImmobilienVergleichsItem } from '@/lib/immobilien-vergleich-context';

interface RenditeVergleichsChartProps {
  immobilien: ImmobilienVergleichsItem[];
}

export function RenditeVergleichsChart({ immobilien }: RenditeVergleichsChartProps) {
  const data = immobilien.map((immobilie) => ({
    name: immobilie.name,
    bruttorendite: immobilie.ergebnis.bruttorendite,
    nettorendite: immobilie.ergebnis.nettorendite,
    eigenkapitalrendite: immobilie.ergebnis.eigenkapitalrendite,
    objektrendite: immobilie.ergebnis.objektrendite,
  }));

  return (
    <div className="w-full h-96">
      <h3 className="text-lg font-semibold mb-4">Rendite-Vergleich</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis>
            <Label
              value="Rendite in %"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(2)}%`, '']}
          />
          <Legend />
          <Bar dataKey="bruttorendite" name="Bruttorendite" fill="#8884d8" />
          <Bar dataKey="nettorendite" name="Nettorendite" fill="#82ca9d" />
          <Bar dataKey="eigenkapitalrendite" name="Eigenkapitalrendite" fill="#ffc658" />
          <Bar dataKey="objektrendite" name="Objektrendite" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

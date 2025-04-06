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
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface RenditeVergleichProps {
  bruttorendite: number;
  nettorendite: number;
  eigenkapitalrendite: number;
  objektrendite: number;
}

export function RenditeVergleichChart({ 
  bruttorendite, 
  nettorendite, 
  eigenkapitalrendite, 
  objektrendite 
}: RenditeVergleichProps) {
  const data = [
    {
      name: 'Bruttorendite',
      wert: bruttorendite,
    },
    {
      name: 'Nettorendite',
      wert: nettorendite,
    },
    {
      name: 'Objektrendite',
      wert: objektrendite,
    },
    {
      name: 'Eigenkapitalrendite',
      wert: eigenkapitalrendite,
    },
  ];

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold mb-4">Rendite-Vergleich</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
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
            formatter={(value: number) => [`${value.toFixed(2)}%`, 'Rendite']}
          />
          <Legend />
          <Bar dataKey="wert" fill="#4f46e5" name="Rendite (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

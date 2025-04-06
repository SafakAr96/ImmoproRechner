import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface KostenaufteilungProps {
  kaufpreis: number;
  grunderwerbsteuer: number;
  notarkosten: number;
  maklerprovision: number;
  grundbuchkosten: number;
}

export function KostenaufteilungChart({ 
  kaufpreis, 
  grunderwerbsteuer, 
  notarkosten, 
  maklerprovision, 
  grundbuchkosten 
}: KostenaufteilungProps) {
  const data = [
    { name: 'Kaufpreis', value: kaufpreis },
    { name: 'Grunderwerbsteuer', value: grunderwerbsteuer },
    { name: 'Notarkosten', value: notarkosten },
    { name: 'Maklerprovision', value: maklerprovision },
    { name: 'Grundbuchkosten', value: grundbuchkosten },
  ];

  const COLORS = ['#4f46e5', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
    index 
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold mb-4">Kostenaufteilung</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [
              `${Math.round(value).toLocaleString('de-DE')} €`, 
              'Betrag'
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

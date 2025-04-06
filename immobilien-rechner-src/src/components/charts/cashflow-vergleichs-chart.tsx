import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from 'recharts';
import { ImmobilienVergleichsItem } from '@/lib/immobilien-vergleich-context';

interface CashflowVergleichsChartProps {
  immobilien: ImmobilienVergleichsItem[];
}

export function CashflowVergleichsChart({ immobilien }: CashflowVergleichsChartProps) {
  // Berechnung der Cashflow-Entwicklung über die Jahre für jede Immobilie
  const data = React.useMemo(() => {
    const jahre = 30;
    const result = [];
    
    for (let i = 0; i <= jahre; i++) {
      const jahresDaten: any = { jahr: i };
      
      immobilien.forEach((immobilie) => {
        const mietsteigerung = immobilie.mietdaten.mietsteigerung / 100;
        let cashflow = immobilie.ergebnis.jaehrlicherCashflow;
        
        // Mietsteigerung für das aktuelle Jahr berechnen
        for (let j = 0; j < i; j++) {
          cashflow = cashflow * (1 + mietsteigerung);
        }
        
        jahresDaten[immobilie.name] = cashflow;
      });
      
      result.push(jahresDaten);
    }
    
    return result;
  }, [immobilien]);

  // Dynamische Farben für die Linien
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00c49f', '#ffbb28', '#ff8042'];

  return (
    <div className="w-full h-96">
      <h3 className="text-lg font-semibold mb-4">Cashflow-Entwicklung im Vergleich</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="jahr"
            label={{ 
              value: 'Jahre', 
              position: 'insideBottomRight', 
              offset: -10 
            }}
          />
          <YAxis
            tickFormatter={(value) => `${Math.round(value / 1000)}T €`}
          >
            <Label
              value="Cashflow pro Jahr (€)"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip 
            formatter={(value: number) => [
              `${Math.round(value).toLocaleString('de-DE')} €`, 
              'Cashflow'
            ]}
            labelFormatter={(value) => `Jahr ${value}`}
          />
          <Legend />
          
          {immobilien.map((immobilie, index) => (
            <Line
              key={immobilie.id}
              type="monotone"
              dataKey={immobilie.name}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

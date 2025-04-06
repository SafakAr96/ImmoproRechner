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
import { formatCurrency } from '@/lib/utils';

interface CashflowEntwicklungProps {
  jaehrlicherCashflow: number;
  mietsteigerung: number;
  jahre: number;
}

export function CashflowEntwicklungChart({ 
  jaehrlicherCashflow, 
  mietsteigerung, 
  jahre = 30 
}: CashflowEntwicklungProps) {
  // Berechnung der Cashflow-Entwicklung über die Jahre
  const data = React.useMemo(() => {
    const result = [];
    let currentCashflow = jaehrlicherCashflow;
    
    for (let i = 0; i <= jahre; i++) {
      result.push({
        jahr: i,
        cashflow: currentCashflow,
      });
      
      // Mietsteigerung für das nächste Jahr berechnen
      currentCashflow = currentCashflow * (1 + mietsteigerung / 100);
    }
    
    return result;
  }, [jaehrlicherCashflow, mietsteigerung, jahre]);

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold mb-4">Cashflow-Entwicklung</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
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
            tickFormatter={(value) => `${Math.round(value).toLocaleString('de-DE')} €`}
          >
            <Label
              value="Cashflow pro Jahr"
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
          <Line 
            type="monotone" 
            dataKey="cashflow" 
            stroke="#4f46e5" 
            activeDot={{ r: 8 }} 
            name="Jährlicher Cashflow"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface TilgungsverlaufProps {
  darlehensBetrag: number;
  zinssatz: number;
  tilgungssatz: number;
  laufzeit: number;
}

export function TilgungsverlaufChart({ 
  darlehensBetrag, 
  zinssatz, 
  tilgungssatz, 
  laufzeit = 30 
}: TilgungsverlaufProps) {
  // Berechnung des Tilgungsverlaufs
  const data = React.useMemo(() => {
    const result = [];
    let restschuld = darlehensBetrag;
    const anfangstilgung = tilgungssatz / 100;
    const zins = zinssatz / 100;
    const jahresrate = darlehensBetrag * (zins + anfangstilgung);
    
    for (let i = 0; i <= laufzeit; i++) {
      const zinszahlung = restschuld * zins;
      const tilgung = jahresrate - zinszahlung;
      
      result.push({
        jahr: i,
        restschuld: restschuld,
        zinszahlung: zinszahlung,
        tilgung: tilgung,
      });
      
      restschuld = Math.max(0, restschuld - tilgung);
      
      // Wenn die Restschuld 0 erreicht hat, brechen wir ab
      if (restschuld <= 0) {
        break;
      }
    }
    
    return result;
  }, [darlehensBetrag, zinssatz, tilgungssatz, laufzeit]);

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold mb-4">Tilgungsverlauf</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
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
              value="Restschuld in €"
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle' }}
            />
          </YAxis>
          <Tooltip 
            formatter={(value: number) => [
              `${Math.round(value).toLocaleString('de-DE')} €`, 
              'Betrag'
            ]}
            labelFormatter={(value) => `Jahr ${value}`}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="restschuld" 
            stroke="#4f46e5" 
            fill="#4f46e5" 
            name="Restschuld"
          />
          <Area 
            type="monotone" 
            dataKey="zinszahlung" 
            stroke="#ef4444" 
            fill="#ef4444" 
            name="Zinszahlung"
            stackId="1"
          />
          <Area 
            type="monotone" 
            dataKey="tilgung" 
            stroke="#22c55e" 
            fill="#22c55e" 
            name="Tilgung"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

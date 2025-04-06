import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FinanzierungsdatenFormProps {
  onSubmit: (data: FinanzierungsdatenFormData) => void;
  onBack: () => void;
  kaufpreis?: number;
  nebenkosten?: number;
}

export interface FinanzierungsdatenFormData {
  eigenkapital: number;
  eigenkapitalAnteil: number;
  darlehensBetrag: number;
  zinssatz: number;
  tilgungssatz: number;
  zinsbindung: number;
  sondertilgung: number;
}

export function FinanzierungsdatenForm({ 
  onSubmit, 
  onBack, 
  kaufpreis = 300000, 
  nebenkosten = 30000 
}: FinanzierungsdatenFormProps) {
  const gesamtkosten = kaufpreis + nebenkosten;
  
  const [formData, setFormData] = React.useState<FinanzierungsdatenFormData>({
    eigenkapital: gesamtkosten * 0.2, // 20% Eigenkapital als Standardwert
    eigenkapitalAnteil: 20,
    darlehensBetrag: gesamtkosten * 0.8,
    zinssatz: 3.5,
    tilgungssatz: 2.0,
    zinsbindung: 10,
    sondertilgung: 5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = Number(value);
    
    if (name === 'eigenkapital') {
      const newEigenkapital = numValue;
      const newEigenkapitalAnteil = (newEigenkapital / gesamtkosten) * 100;
      const newDarlehensBetrag = gesamtkosten - newEigenkapital;
      
      setFormData((prev) => ({
        ...prev,
        eigenkapital: newEigenkapital,
        eigenkapitalAnteil: parseFloat(newEigenkapitalAnteil.toFixed(2)),
        darlehensBetrag: newDarlehensBetrag,
      }));
    } else if (name === 'eigenkapitalAnteil') {
      const newEigenkapitalAnteil = numValue;
      const newEigenkapital = (gesamtkosten * newEigenkapitalAnteil) / 100;
      const newDarlehensBetrag = gesamtkosten - newEigenkapital;
      
      setFormData((prev) => ({
        ...prev,
        eigenkapital: parseFloat(newEigenkapital.toFixed(2)),
        eigenkapitalAnteil: newEigenkapitalAnteil,
        darlehensBetrag: parseFloat(newDarlehensBetrag.toFixed(2)),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    }
  };

  const handleSliderChange = (name: string, value: number[]) => {
    const numValue = value[0];
    
    if (name === 'eigenkapitalAnteil') {
      const newEigenkapitalAnteil = numValue;
      const newEigenkapital = (gesamtkosten * newEigenkapitalAnteil) / 100;
      const newDarlehensBetrag = gesamtkosten - newEigenkapital;
      
      setFormData((prev) => ({
        ...prev,
        eigenkapital: parseFloat(newEigenkapital.toFixed(2)),
        eigenkapitalAnteil: newEigenkapitalAnteil,
        darlehensBetrag: parseFloat(newDarlehensBetrag.toFixed(2)),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Finanzierungsdaten</h2>
        
        <div className="p-4 bg-gray-100 rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Kaufpreis:</p>
              <p className="text-lg font-bold">{kaufpreis.toLocaleString('de-DE')} €</p>
            </div>
            <div>
              <p className="text-sm font-medium">Nebenkosten:</p>
              <p className="text-lg font-bold">{nebenkosten.toLocaleString('de-DE')} €</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm font-medium">Gesamtkosten:</p>
              <p className="text-lg font-bold">{gesamtkosten.toLocaleString('de-DE')} €</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="eigenkapitalAnteil">Eigenkapitalanteil (%)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="eigenkapitalAnteil"
              value={[formData.eigenkapitalAnteil]}
              onValueChange={(value) => handleSliderChange('eigenkapitalAnteil', value)}
              min={0}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="w-12 text-right">{formData.eigenkapitalAnteil.toFixed(0)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="eigenkapital">Eigenkapital (€)</Label>
          <Input
            id="eigenkapital"
            name="eigenkapital"
            type="number"
            value={formData.eigenkapital}
            onChange={handleChange}
            min={0}
            max={gesamtkosten}
            step={1000}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="darlehensBetrag">Darlehensbetrag (€)</Label>
          <Input
            id="darlehensBetrag"
            name="darlehensBetrag"
            type="number"
            value={formData.darlehensBetrag}
            readOnly
            className="bg-gray-100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zinssatz">Zinssatz (%)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="zinssatz"
              value={[formData.zinssatz]}
              onValueChange={(value) => handleSliderChange('zinssatz', value)}
              min={1}
              max={10}
              step={0.1}
              className="flex-1"
            />
            <span className="w-12 text-right">{formData.zinssatz.toFixed(1)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tilgungssatz">Tilgungssatz (%)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="tilgungssatz"
              value={[formData.tilgungssatz]}
              onValueChange={(value) => handleSliderChange('tilgungssatz', value)}
              min={1}
              max={10}
              step={0.1}
              className="flex-1"
            />
            <span className="w-12 text-right">{formData.tilgungssatz.toFixed(1)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="zinsbindung">Zinsbindung (Jahre)</Label>
          <Select 
            value={formData.zinsbindung.toString()} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, zinsbindung: Number(value) }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Zinsbindung auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 Jahre</SelectItem>
              <SelectItem value="10">10 Jahre</SelectItem>
              <SelectItem value="15">15 Jahre</SelectItem>
              <SelectItem value="20">20 Jahre</SelectItem>
              <SelectItem value="25">25 Jahre</SelectItem>
              <SelectItem value="30">30 Jahre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sondertilgung">Jährliche Sondertilgung (%)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="sondertilgung"
              value={[formData.sondertilgung]}
              onValueChange={(value) => handleSliderChange('sondertilgung', value)}
              min={0}
              max={10}
              step={1}
              className="flex-1"
            />
            <span className="w-12 text-right">{formData.sondertilgung.toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between space-x-4">
        <Button type="button" variant="outline" onClick={onBack} className="w-1/2">
          Zurück
        </Button>
        <Button type="submit" className="w-1/2">
          Weiter
        </Button>
      </div>
    </form>
  );
}

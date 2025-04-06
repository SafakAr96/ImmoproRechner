import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MietdatenFormProps {
  onSubmit: (data: MietdatenFormData) => void;
  onBack: () => void;
}

export interface MietdatenFormData {
  kaltmiete: number;
  nebenkosten: number;
  mieteinnahmenProQm: number;
  mietsteigerung: number;
  leerstandsrate: number;
  verwaltungskosten: number;
  instandhaltungskosten: number;
  ruecklage: number;
}

export function MietdatenForm({ onSubmit, onBack }: MietdatenFormProps) {
  const [formData, setFormData] = React.useState<MietdatenFormData>({
    kaltmiete: 1000,
    nebenkosten: 250,
    mieteinnahmenProQm: 10,
    mietsteigerung: 2,
    leerstandsrate: 3,
    verwaltungskosten: 5,
    instandhaltungskosten: 1.5,
    ruecklage: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value[0],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Mietdaten</h2>
        
        <div className="space-y-2">
          <Label htmlFor="kaltmiete">Monatliche Kaltmiete (€)</Label>
          <Input
            id="kaltmiete"
            name="kaltmiete"
            type="number"
            value={formData.kaltmiete}
            onChange={handleChange}
            min={0}
            step={10}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nebenkosten">Monatliche Nebenkosten (€)</Label>
          <Input
            id="nebenkosten"
            name="nebenkosten"
            type="number"
            value={formData.nebenkosten}
            onChange={handleChange}
            min={0}
            step={10}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mieteinnahmenProQm">Mieteinnahmen pro m² (€)</Label>
          <Input
            id="mieteinnahmenProQm"
            name="mieteinnahmenProQm"
            type="number"
            value={formData.mieteinnahmenProQm}
            onChange={handleChange}
            min={0}
            step={0.1}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mietsteigerung">Jährliche Mietsteigerung (%)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="mietsteigerung"
              value={[formData.mietsteigerung]}
              onValueChange={(value) => handleSliderChange('mietsteigerung', value)}
              min={0}
              max={5}
              step={0.1}
              className="flex-1"
            />
            <span className="w-12 text-right">{formData.mietsteigerung.toFixed(1)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="leerstandsrate">Leerstandsrate (%)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="leerstandsrate"
              value={[formData.leerstandsrate]}
              onValueChange={(value) => handleSliderChange('leerstandsrate', value)}
              min={0}
              max={10}
              step={0.5}
              className="flex-1"
            />
            <span className="w-12 text-right">{formData.leerstandsrate.toFixed(1)}%</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-6">Bewirtschaftungskosten</h3>

        <div className="space-y-2">
          <Label htmlFor="verwaltungskosten">Verwaltungskosten (% der Jahresmiete)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="verwaltungskosten"
              value={[formData.verwaltungskosten]}
              onValueChange={(value) => handleSliderChange('verwaltungskosten', value)}
              min={0}
              max={10}
              step={0.5}
              className="flex-1"
            />
            <span className="w-12 text-right">{formData.verwaltungskosten.toFixed(1)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="instandhaltungskosten">Instandhaltungskosten (% des Kaufpreises p.a.)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="instandhaltungskosten"
              value={[formData.instandhaltungskosten]}
              onValueChange={(value) => handleSliderChange('instandhaltungskosten', value)}
              min={0}
              max={3}
              step={0.1}
              className="flex-1"
            />
            <span className="w-12 text-right">{formData.instandhaltungskosten.toFixed(1)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ruecklage">Rücklage (% des Kaufpreises p.a.)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="ruecklage"
              value={[formData.ruecklage]}
              onValueChange={(value) => handleSliderChange('ruecklage', value)}
              min={0}
              max={2}
              step={0.1}
              className="flex-1"
            />
            <span className="w-12 text-right">{formData.ruecklage.toFixed(1)}%</span>
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

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ImmobiliendatenFormProps {
  onSubmit: (data: ImmobiliendatenFormData) => void;
}

export interface ImmobiliendatenFormData {
  kaufpreis: number;
  wohnflaeche: number;
  grundstuecksflaeche: number;
  baujahr: number;
  zustand: string;
  standort: string;
  grunderwerbsteuer: number;
  notarkosten: number;
  maklerprovision: number;
  grundbuchkosten: number;
}

export function ImmobiliendatenForm({ onSubmit }: ImmobiliendatenFormProps) {
  const [formData, setFormData] = React.useState<ImmobiliendatenFormData>({
    kaufpreis: 300000,
    wohnflaeche: 100,
    grundstuecksflaeche: 200,
    baujahr: 2000,
    zustand: 'gut',
    standort: 'stadt',
    grunderwerbsteuer: 5.0,
    notarkosten: 1.5,
    maklerprovision: 3.57,
    grundbuchkosten: 0.5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'zustand' || name === 'standort' ? value : Number(value),
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        <h2 className="text-2xl font-bold">Immobiliendaten</h2>
        
        <div className="space-y-2">
          <Label htmlFor="kaufpreis">Kaufpreis (€)</Label>
          <Input
            id="kaufpreis"
            name="kaufpreis"
            type="number"
            value={formData.kaufpreis}
            onChange={handleChange}
            min={0}
            step={1000}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="wohnflaeche">Wohnfläche (m²)</Label>
          <Input
            id="wohnflaeche"
            name="wohnflaeche"
            type="number"
            value={formData.wohnflaeche}
            onChange={handleChange}
            min={0}
            step={1}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="grundstuecksflaeche">Grundstücksfläche (m²)</Label>
          <Input
            id="grundstuecksflaeche"
            name="grundstuecksflaeche"
            type="number"
            value={formData.grundstuecksflaeche}
            onChange={handleChange}
            min={0}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="baujahr">Baujahr</Label>
          <Input
            id="baujahr"
            name="baujahr"
            type="number"
            value={formData.baujahr}
            onChange={handleChange}
            min={1800}
            max={new Date().getFullYear()}
            step={1}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zustand">Zustand</Label>
          <Select 
            value={formData.zustand} 
            onValueChange={(value) => handleSelectChange('zustand', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Zustand auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neuwertig">Neuwertig</SelectItem>
              <SelectItem value="sehr_gut">Sehr gut</SelectItem>
              <SelectItem value="gut">Gut</SelectItem>
              <SelectItem value="mittel">Mittel</SelectItem>
              <SelectItem value="renovierungsbeduerftig">Renovierungsbedürftig</SelectItem>
              <SelectItem value="sanierungsbeduerftig">Sanierungsbedürftig</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="standort">Standort</Label>
          <Select 
            value={formData.standort} 
            onValueChange={(value) => handleSelectChange('standort', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Standort auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a_lage">A-Lage (Großstadt Zentrum)</SelectItem>
              <SelectItem value="b_lage">B-Lage (Großstadt Randlage)</SelectItem>
              <SelectItem value="stadt">Mittelgroße Stadt</SelectItem>
              <SelectItem value="kleinstadt">Kleinstadt</SelectItem>
              <SelectItem value="land">Ländliche Region</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <h3 className="text-xl font-semibold mt-6">Kaufnebenkosten</h3>

        <div className="space-y-2">
          <Label htmlFor="grunderwerbsteuer">Grunderwerbsteuer (%)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="grunderwerbsteuer"
              value={[formData.grunderwerbsteuer]}
              onValueChange={(value) => handleSliderChange('grunderwerbsteuer', value)}
              min={3.5}
              max={6.5}
              step={0.5}
              className="flex-1"
            />
            <span className="w-12 text-right">{formData.grunderwerbsteuer.toFixed(1)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notarkosten">Notarkosten (%)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="notarkosten"
              value={[formData.notarkosten]}
              onValueChange={(value) => handleSliderChange('notarkosten', value)}
              min={1.0}
              max={2.0}
              step={0.1}
              className="flex-1"
            />
            <span className="w-12 text-right">{formData.notarkosten.toFixed(1)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maklerprovision">Maklerprovision (%)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="maklerprovision"
              value={[formData.maklerprovision]}
              onValueChange={(value) => handleSliderChange('maklerprovision', value)}
              min={0}
              max={7.14}
              step={0.01}
              className="flex-1"
            />
            <span className="w-12 text-right">{formData.maklerprovision.toFixed(2)}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="grundbuchkosten">Grundbuchkosten (%)</Label>
          <div className="flex items-center space-x-4">
            <Slider
              id="grundbuchkosten"
              value={[formData.grundbuchkosten]}
              onValueChange={(value) => handleSliderChange('grundbuchkosten', value)}
              min={0.1}
              max={1.0}
              step={0.1}
              className="flex-1"
            />
            <span className="w-12 text-right">{formData.grundbuchkosten.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">Weiter</Button>
    </form>
  );
}

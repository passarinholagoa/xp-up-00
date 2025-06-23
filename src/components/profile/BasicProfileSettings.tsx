
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ProfileCustomization, ShopItem } from '@/types/profile';

interface BasicProfileSettingsProps {
  tempProfile: ProfileCustomization;
  setTempProfile: (profile: ProfileCustomization) => void;
  ownedAvatars: ShopItem[];
  onSave: () => void;
  onCancel: () => void;
}

export const BasicProfileSettings = ({ 
  tempProfile, 
  setTempProfile, 
  ownedAvatars, 
  onSave, 
  onCancel 
}: BasicProfileSettingsProps) => {
  return (
    <Card className="p-6 bg-gray-900/50 border-gray-800 space-y-6">
      <h4 className="font-bold text-white text-lg">Configurações Básicas</h4>
      
      <div className="space-y-2">
        <Label htmlFor="displayName" className="text-white text-sm font-medium">Nome de Exibição</Label>
        <Input
          id="displayName"
          value={tempProfile.displayName}
          onChange={(e) => setTempProfile({ ...tempProfile, displayName: e.target.value })}
          placeholder="Digite seu nome"
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-white text-sm font-medium">Itens Possuídos</Label>
        <div className="grid grid-cols-6 gap-2">
          {ownedAvatars.map(item => (
            <Button
              key={item.id}
              variant={tempProfile.avatar === item.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTempProfile({ ...tempProfile, avatar: item.value })}
              className="text-lg p-2 h-12 w-12"
            >
              {item.value}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel} className="border-gray-600 text-white px-4 py-2">
          Cancelar
        </Button>
        <Button onClick={onSave} className="bg-purple-600 hover:bg-purple-700 px-4 py-2">
          Salvar Alterações
        </Button>
      </div>
    </Card>
  );
};

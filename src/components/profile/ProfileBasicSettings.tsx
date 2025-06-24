
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProfileCustomization, ShopItem } from '@/types/profile';

interface ProfileBasicSettingsProps {
  tempProfile: ProfileCustomization;
  setTempProfile: (profile: ProfileCustomization) => void;
  ownedAvatars: ShopItem[];
  ownedFrames: ShopItem[];
  ownedColors: ShopItem[];
  ownedBackgrounds: ShopItem[];
  onSave: () => void;
  onCancel: () => void;
}

export const ProfileBasicSettings = ({ 
  tempProfile, 
  setTempProfile, 
  ownedAvatars,
  ownedFrames,
  ownedColors,
  ownedBackgrounds,
  onSave, 
  onCancel 
}: ProfileBasicSettingsProps) => {
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
        <Label className="text-white text-sm font-medium">Avatares Possuídos</Label>
        <div className="grid grid-cols-6 gap-2">
          {ownedAvatars.map(item => (
            <Button
              key={item.id}
              variant={tempProfile.avatar === item.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTempProfile({ ...tempProfile, avatar: item.value })}
              className="text-lg p-2 h-12 w-12"
              title={item.name}
            >
              {item.value}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-white text-sm font-medium">Molduras Possuídas</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={tempProfile.frameBorder === 'border-2 border-primary/50' ? "default" : "outline"}
            size="sm"
            onClick={() => setTempProfile({ ...tempProfile, frameBorder: 'border-2 border-primary/50' })}
            className="text-xs p-2 h-8"
          >
            Padrão
          </Button>
          {ownedFrames.map(item => (
            <Button
              key={item.id}
              variant={tempProfile.frameBorder === item.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTempProfile({ ...tempProfile, frameBorder: item.value })}
              className="text-xs p-2 h-8 truncate"
              title={item.name}
            >
              {item.icon} {item.name.split(' ')[1]}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-white text-sm font-medium">Cores de Nome Possuídas</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={tempProfile.nameColor === 'text-foreground' ? "default" : "outline"}
            size="sm"
            onClick={() => setTempProfile({ ...tempProfile, nameColor: 'text-foreground' })}
            className="text-xs p-2 h-8"
          >
            Padrão
          </Button>
          {ownedColors.map(item => (
            <Button
              key={item.id}
              variant={tempProfile.nameColor === item.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTempProfile({ ...tempProfile, nameColor: item.value })}
              className="text-xs p-2 h-8 truncate"
              title={item.name}
            >
              {item.icon} {item.name.split(' ')[1]}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-white text-sm font-medium">Fundos Possuídos</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={tempProfile.backgroundColor === 'bg-card' ? "default" : "outline"}
            size="sm"
            onClick={() => setTempProfile({ ...tempProfile, backgroundColor: 'bg-card' })}
            className="text-xs p-2 h-8"
          >
            Padrão
          </Button>
          {ownedBackgrounds.map(item => (
            <Button
              key={item.id}
              variant={tempProfile.backgroundColor === item.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTempProfile({ ...tempProfile, backgroundColor: item.value })}
              className="text-xs p-2 h-8 truncate"
              title={item.name}
            >
              {item.icon} {item.name.split(' ')[1]}
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

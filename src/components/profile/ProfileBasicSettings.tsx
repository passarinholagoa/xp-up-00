
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
    <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <h4 className="font-bold text-white text-lg mb-4">Configurações Básicas</h4>
        
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
      </Card>

      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <h4 className="font-bold text-white text-lg mb-4">Avatares Possuídos</h4>
        <div className="grid grid-cols-4 gap-3 max-h-32 overflow-y-auto">
          {ownedAvatars.map(item => (
            <Button
              key={item.id}
              variant={tempProfile.avatar === item.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTempProfile({ ...tempProfile, avatar: item.value })}
              className="text-2xl p-3 h-14 w-14 flex items-center justify-center"
              title={item.name}
            >
              {item.value}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <h4 className="font-bold text-white text-lg mb-4">Molduras Possuídas</h4>
        <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto">
          <Button
            variant={tempProfile.frameBorder === 'border-2 border-primary/50' ? "default" : "outline"}
            size="sm"
            onClick={() => setTempProfile({ ...tempProfile, frameBorder: 'border-2 border-primary/50' })}
            className="text-sm p-3 h-12 flex items-center justify-center"
          >
            🔳 Padrão
          </Button>
          {ownedFrames.map(item => (
            <Button
              key={item.id}
              variant={tempProfile.frameBorder === item.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTempProfile({ ...tempProfile, frameBorder: item.value })}
              className="text-sm p-3 h-12 flex items-center justify-center gap-2"
              title={item.name}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="truncate">{item.name.replace('Moldura ', '')}</span>
            </Button>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <h4 className="font-bold text-white text-lg mb-4">Cores de Nome Possuídas</h4>
        <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto">
          <Button
            variant={tempProfile.nameColor === 'text-foreground' ? "default" : "outline"}
            size="sm"
            onClick={() => setTempProfile({ ...tempProfile, nameColor: 'text-foreground' })}
            className="text-sm p-3 h-12 flex items-center justify-center"
          >
            ⚪ Padrão
          </Button>
          {ownedColors.map(item => (
            <Button
              key={item.id}
              variant={tempProfile.nameColor === item.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTempProfile({ ...tempProfile, nameColor: item.value })}
              className="text-sm p-3 h-12 flex items-center justify-center gap-2"
              title={item.name}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="truncate">{item.name.replace('Nome ', '')}</span>
            </Button>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <h4 className="font-bold text-white text-lg mb-4">Fundos Possuídos</h4>
        <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto">
          <Button
            variant={tempProfile.backgroundColor === 'bg-card' ? "default" : "outline"}
            size="sm"
            onClick={() => setTempProfile({ ...tempProfile, backgroundColor: 'bg-card' })}
            className="text-sm p-3 h-12 flex items-center justify-center"
          >
            🔲 Padrão
          </Button>
          {ownedBackgrounds.map(item => (
            <Button
              key={item.id}
              variant={tempProfile.backgroundColor === item.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTempProfile({ ...tempProfile, backgroundColor: item.value })}
              className="text-sm p-3 h-12 flex items-center justify-center gap-2"
              title={item.name}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="truncate">{item.name.replace('Fundo ', '')}</span>
            </Button>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gray-900/50 border-gray-800">
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel} className="border-gray-600 text-white px-6 py-2">
            Cancelar
          </Button>
          <Button onClick={onSave} className="bg-purple-600 hover:bg-purple-700 px-6 py-2">
            Salvar Alterações
          </Button>
        </div>
      </Card>
    </div>
  );
};

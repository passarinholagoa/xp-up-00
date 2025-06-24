
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
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
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 pr-2">
        <div className="space-y-4">
          {/* Nome de Exibição */}
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h4 className="font-bold text-white text-sm mb-3">Nome de Exibição</h4>
            <Input
              value={tempProfile.displayName}
              onChange={(e) => setTempProfile({ ...tempProfile, displayName: e.target.value })}
              placeholder="Digite seu nome"
              className="bg-gray-800 border-gray-700 text-white text-sm h-8"
            />
          </Card>

          {/* Avatares */}
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h4 className="font-bold text-white text-sm mb-3">Avatares</h4>
            <div className="grid grid-cols-6 gap-2">
              {ownedAvatars.map(item => (
                <Button
                  key={item.id}
                  variant={tempProfile.avatar === item.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTempProfile({ ...tempProfile, avatar: item.value })}
                  className="text-base p-1 h-8 w-8 flex items-center justify-center"
                  title={item.name}
                >
                  {item.value}
                </Button>
              ))}
            </div>
          </Card>

          {/* Molduras */}
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h4 className="font-bold text-white text-sm mb-3">Molduras</h4>
            <div className="space-y-2">
              <Button
                variant={tempProfile.frameBorder === 'border-2 border-primary/50' ? "default" : "outline"}
                size="sm"
                onClick={() => setTempProfile({ ...tempProfile, frameBorder: 'border-2 border-primary/50' })}
                className="w-full text-xs h-8 flex items-center justify-center"
              >
                🔳 Padrão
              </Button>
              {ownedFrames.map(item => (
                <Button
                  key={item.id}
                  variant={tempProfile.frameBorder === item.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTempProfile({ ...tempProfile, frameBorder: item.value })}
                  className="w-full text-xs h-8 flex items-center justify-start gap-2 px-3"
                  title={item.name}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="truncate">{item.name.replace('Moldura ', '')}</span>
                </Button>
              ))}
            </div>
          </Card>

          {/* Cores */}
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h4 className="font-bold text-white text-sm mb-3">Cores do Nome</h4>
            <div className="space-y-2">
              <Button
                variant={tempProfile.nameColor === 'text-foreground' ? "default" : "outline"}
                size="sm"
                onClick={() => setTempProfile({ ...tempProfile, nameColor: 'text-foreground' })}
                className="w-full text-xs h-8 flex items-center justify-center"
              >
                ⚪ Padrão
              </Button>
              {ownedColors.map(item => (
                <Button
                  key={item.id}
                  variant={tempProfile.nameColor === item.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTempProfile({ ...tempProfile, nameColor: item.value })}
                  className="w-full text-xs h-8 flex items-center justify-start gap-2 px-3"
                  title={item.name}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="truncate">{item.name.replace('Nome ', '')}</span>
                </Button>
              ))}
            </div>
          </Card>

          {/* Fundos */}
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <h4 className="font-bold text-white text-sm mb-3">Fundos</h4>
            <div className="space-y-2">
              <Button
                variant={tempProfile.backgroundColor === 'bg-card' ? "default" : "outline"}
                size="sm"
                onClick={() => setTempProfile({ ...tempProfile, backgroundColor: 'bg-card' })}
                className="w-full text-xs h-8 flex items-center justify-center"
              >
                🔲 Padrão
              </Button>
              {ownedBackgrounds.map(item => (
                <Button
                  key={item.id}
                  variant={tempProfile.backgroundColor === item.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTempProfile({ ...tempProfile, backgroundColor: item.value })}
                  className="w-full text-xs h-8 flex items-center justify-start gap-2 px-3"
                  title={item.name}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="truncate">{item.name.replace('Fundo ', '')}</span>
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </ScrollArea>

      {/* Botões fixos no final */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onCancel} 
            className="flex-1 border-gray-600 text-white text-sm h-9"
          >
            Cancelar
          </Button>
          <Button 
            onClick={onSave} 
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-sm h-9"
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

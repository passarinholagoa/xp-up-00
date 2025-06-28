
import React from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Palette, Zap, Lock } from 'lucide-react';
import { XpUpSettings, SettingsLock } from '@/types/settings';

interface SettingsVisualSectionProps {
  settings: XpUpSettings;
  settingsLocks: Record<keyof XpUpSettings, SettingsLock>;
  onToggle: (key: keyof XpUpSettings) => void;
}

export const SettingsVisualSection = ({ settings, settingsLocks, onToggle }: SettingsVisualSectionProps) => {
  return (
    <Card className="p-4 bg-card/50 border-border">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-4 w-4 text-purple-400" />
        <h3 className="font-semibold text-purple-400">Personalização Visual</h3>
      </div>
      
      <div className="space-y-4">
        {/* Barra de XP Animada */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <div className="flex flex-col">
                <Label className="text-sm">Barra de XP Animada</Label>
                <span className="text-xs text-muted-foreground">
                  {settingsLocks.animatedXpBar.isLocked 
                    ? settingsLocks.animatedXpBar.reason
                    : 'Faz o número do nível mudar de cor continuamente'
                  }
                </span>
              </div>
              {settingsLocks.animatedXpBar.isLocked && (
                <Lock className="h-3 w-3 text-yellow-400" />
              )}
            </div>
            <Switch
              checked={settings.animatedXpBar}
              onCheckedChange={() => onToggle('animatedXpBar')}
              disabled={settingsLocks.animatedXpBar.isLocked}
            />
          </div>
          
          {/* Descrição sobre desbloqueio */}
          {!settingsLocks.animatedXpBar.isLocked && (
            <div className="ml-6 p-2 bg-green-900/20 border border-green-800/30 rounded-lg">
              <p className="text-xs text-green-300">
                🎉 Funcionalidade desbloqueada! Disponível a partir do nível 10 ou com a conquista "XP Master".
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

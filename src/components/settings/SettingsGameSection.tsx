
import React from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Shield, Plane, Lock } from 'lucide-react';
import { XpUpSettings, SettingsLock } from '@/types/settings';

interface SettingsGameSectionProps {
  settings: XpUpSettings;
  settingsLocks: Record<keyof XpUpSettings, SettingsLock>;
  onToggle: (key: keyof XpUpSettings) => void;
}

export const SettingsGameSection = ({ settings, settingsLocks, onToggle }: SettingsGameSectionProps) => {
  return (
    <Card className="p-4 bg-card/50 border-border">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-4 w-4 text-red-400" />
        <h3 className="font-semibold text-red-400">Funcionalidades Gamificadas</h3>
      </div>
      
      <div className="space-y-4">
        {/* Modo Hardcore */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Modo Hardcore</Label>
                {settings.hardcoreMode && (
                  <Badge variant="destructive" className="text-xs">ATIVO</Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {settingsLocks.hardcoreMode.isLocked 
                  ? settingsLocks.hardcoreMode.reason
                  : 'Penalidades severas, mas XP e moedas aumentados'
                }
              </span>
            </div>
            {settingsLocks.hardcoreMode.isLocked && (
              <Lock className="h-3 w-3 text-yellow-400" />
            )}
          </div>
          <Switch
            checked={settings.hardcoreMode}
            onCheckedChange={() => onToggle('hardcoreMode')}
            disabled={settingsLocks.hardcoreMode.isLocked}
          />
        </div>

        {/* Modo Férias */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Modo Férias</Label>
                {settings.vacationMode && (
                  <Badge variant="secondary" className="text-xs">PAUSADO</Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                Pausa penalidades temporariamente
              </span>
            </div>
          </div>
          <Switch
            checked={settings.vacationMode}
            onCheckedChange={() => onToggle('vacationMode')}
          />
        </div>
      </div>
    </Card>
  );
};

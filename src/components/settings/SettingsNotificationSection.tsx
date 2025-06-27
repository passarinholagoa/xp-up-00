
import React from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell } from 'lucide-react';
import { XpUpSettings } from '@/types/settings';

interface SettingsNotificationSectionProps {
  settings: XpUpSettings;
  onToggle: (key: keyof XpUpSettings) => void;
}

export const SettingsNotificationSection = ({ settings, onToggle }: SettingsNotificationSectionProps) => {
  return (
    <Card className="p-4 bg-card/50 border-border">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="h-4 w-4 text-blue-400" />
        <h3 className="font-semibold text-blue-400">Notificações Globais</h3>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <div className="flex flex-col">
            <Label className="text-sm">Ativar Notificações</Label>
            <span className="text-xs text-muted-foreground">
              Controla todas as notificações do sistema
            </span>
          </div>
        </div>
        <Switch
          checked={settings.globalNotifications}
          onCheckedChange={() => onToggle('globalNotifications')}
        />
      </div>
    </Card>
  );
};

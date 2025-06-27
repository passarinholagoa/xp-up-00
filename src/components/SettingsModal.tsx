
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGame } from '@/contexts/GameContext';
import { XpUpSettings, getSettingsLocks } from '@/types/settings';
import { Zap } from 'lucide-react';
import { SettingsVisualSection } from '@/components/settings/SettingsVisualSection';
import { SettingsNotificationSection } from '@/components/settings/SettingsNotificationSection';
import { SettingsGameSection } from '@/components/settings/SettingsGameSection';
import { SettingsInfoSection } from '@/components/settings/SettingsInfoSection';
import { SettingsPrivacySection } from '@/components/settings/SettingsPrivacySection';
import { SettingsHelpSection } from '@/components/settings/SettingsHelpSection';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { gameState, achievements, settings, updateSettings } = useGame();
  const [tempSettings, setTempSettings] = useState<XpUpSettings>(settings);
  
  const settingsLocks = getSettingsLocks(gameState.level, achievements);

  const handleToggle = (key: keyof XpUpSettings) => {
    if (settingsLocks[key].isLocked) return;
    
    setTempSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    updateSettings(tempSettings);
    onClose();
  };

  const handleCancel = () => {
    setTempSettings(settings);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Configurações XpUp
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-2">
          <div className="space-y-6">
            <SettingsVisualSection 
              settings={tempSettings}
              settingsLocks={settingsLocks}
              onToggle={handleToggle}
            />

            <SettingsNotificationSection 
              settings={tempSettings}
              onToggle={handleToggle}
            />

            <SettingsGameSection 
              settings={tempSettings}
              settingsLocks={settingsLocks}
              onToggle={handleToggle}
            />

            <SettingsInfoSection />

            <SettingsPrivacySection />

            <SettingsHelpSection />
          </div>
        </ScrollArea>

        <Separator className="bg-border" />

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="flex-1 border-border text-foreground hover:bg-accent"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Salvar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

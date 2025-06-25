import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGame } from '@/contexts/GameContext';
import { XpUpSettings, getSettingsLocks } from '@/types/settings';
import { Lock, Palette, Bell, Zap, Shield, Plane, Frame, Image } from 'lucide-react';

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
            {/* Personalização Visual */}
            <Card className="p-4 bg-card/50 border-border">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-4 w-4 text-purple-400" />
                <h3 className="font-semibold text-purple-400">Personalização Visual</h3>
              </div>
              
              <div className="space-y-4">
                {/* Barra de XP Animada */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <div className="flex flex-col">
                      <Label className="text-sm">Barra de XP Animada</Label>
                      {settingsLocks.animatedXpBar.isLocked && (
                        <span className="text-xs text-muted-foreground">
                          {settingsLocks.animatedXpBar.reason}
                        </span>
                      )}
                    </div>
                    {settingsLocks.animatedXpBar.isLocked && (
                      <Lock className="h-3 w-3 text-yellow-400" />
                    )}
                  </div>
                  <Switch
                    checked={tempSettings.animatedXpBar}
                    onCheckedChange={() => handleToggle('animatedXpBar')}
                    disabled={settingsLocks.animatedXpBar.isLocked}
                  />
                </div>

                {/* Mostrar Moldura */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Frame className="h-4 w-4" />
                    <Label className="text-sm">Mostrar Moldura no Perfil</Label>
                  </div>
                  <Switch
                    checked={tempSettings.showProfileFrame}
                    onCheckedChange={() => handleToggle('showProfileFrame')}
                  />
                </div>

                {/* Exibir Fundo */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4" />
                    <Label className="text-sm">Exibir Fundo no Perfil</Label>
                  </div>
                  <Switch
                    checked={tempSettings.showProfileBackground}
                    onCheckedChange={() => handleToggle('showProfileBackground')}
                  />
                </div>
              </div>
            </Card>

            {/* Notificações Globais */}
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
                  checked={tempSettings.globalNotifications}
                  onCheckedChange={() => handleToggle('globalNotifications')}
                />
              </div>
            </Card>

            {/* Funcionalidades Gamificadas */}
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
                        {tempSettings.hardcoreMode && (
                          <Badge variant="destructive" className="text-xs">ATIVO</Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Penalidades severas, mas XP e moedas aumentados
                      </span>
                      {settingsLocks.hardcoreMode.isLocked && (
                        <span className="text-xs text-yellow-400">
                          {settingsLocks.hardcoreMode.reason}
                        </span>
                      )}
                    </div>
                    {settingsLocks.hardcoreMode.isLocked && (
                      <Lock className="h-3 w-3 text-yellow-400" />
                    )}
                  </div>
                  <Switch
                    checked={tempSettings.hardcoreMode}
                    onCheckedChange={() => handleToggle('hardcoreMode')}
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
                        {tempSettings.vacationMode && (
                          <Badge variant="secondary" className="text-xs">PAUSADO</Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Pausa penalidades temporariamente
                      </span>
                    </div>
                  </div>
                  <Switch
                    checked={tempSettings.vacationMode}
                    onCheckedChange={() => handleToggle('vacationMode')}
                  />
                </div>
              </div>
            </Card>

            {/* Info sobre níveis */}
            <Card className="p-3 bg-blue-900/20 border-blue-800">
              <div className="text-xs text-blue-300">
                <p className="mb-1">🔒 <strong>Nível Atual:</strong> {gameState.level}</p>
                <p className="mb-1">🏆 <strong>Conquistas:</strong> {achievements.filter(a => a.unlocked).length}/{achievements.length}</p>
                <p className="text-blue-400">
                  Algumas configurações são desbloqueadas conforme você progride no jogo!
                </p>
              </div>
            </Card>
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

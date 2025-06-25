
import React, { useState } from 'react';
import { Settings, Palette, Bell, Trophy, Lock, RotateCcw } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSettings } from '@/contexts/SettingsContext';
import { useGame } from '@/contexts/GameContext';
import { SETTINGS_CATEGORIES } from '@/types/settings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { settings, updateSetting, resetSettings, isSettingLocked } = useSettings();
  const { gameState, achievements } = useGame();
  const [activeTab, setActiveTab] = useState('visual');

  const SettingRow = ({ 
    title, 
    description, 
    setting, 
    value, 
    locked = false,
    lockReason = '',
    onToggle 
  }: {
    title: string;
    description: string;
    setting: string;
    value: boolean;
    locked?: boolean;
    lockReason?: string;
    onToggle: () => void;
  }) => (
    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{title}</h4>
          {locked && (
            <Badge variant="outline" className="text-xs bg-orange-500/10 border-orange-500/50">
              <Lock className="h-3 w-3 mr-1" />
              Bloqueado
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        {locked && (
          <p className="text-xs text-orange-400 mt-1">{lockReason}</p>
        )}
      </div>
      <Switch
        checked={value}
        onCheckedChange={onToggle}
        disabled={locked}
        className={locked ? 'opacity-50' : ''}
      />
    </div>
  );

  const renderVisualSettings = () => (
    <div className="space-y-4">
      <SettingRow
        title="Tema Escuro"
        description="Ativar ou desativar modo escuro"
        setting="darkMode"
        value={settings.darkMode}
        onToggle={() => updateSetting('darkMode', !settings.darkMode)}
      />
      
      <SettingRow
        title="Barra de XP Animada"
        description="Animação especial ao ganhar XP"
        setting="animatedXpBar"
        value={settings.animatedXpBar}
        locked={isSettingLocked('animatedXpBar', gameState.level, achievements)}
        lockReason="🔒 Desbloqueie no Nível 10 ou com a conquista 'XP Master'"
        onToggle={() => updateSetting('animatedXpBar', !settings.animatedXpBar)}
      />
      
      <SettingRow
        title="Mostrar Moldura no Perfil"
        description="Exibir ou ocultar a moldura visual do perfil"
        setting="showProfileFrame"
        value={settings.showProfileFrame}
        onToggle={() => updateSetting('showProfileFrame', !settings.showProfileFrame)}
      />
      
      <SettingRow
        title="Exibir Fundo no Perfil"
        description="Ativar ou remover fundo decorativo no perfil"
        setting="showProfileBackground"
        value={settings.showProfileBackground}
        onToggle={() => updateSetting('showProfileBackground', !settings.showProfileBackground)}
      />
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4">
      <SettingRow
        title="Ativar Notificações"
        description="Controle único para todas as notificações do sistema (tarefas, conquistas, streaks)"
        setting="notificationsEnabled"
        value={settings.notificationsEnabled}
        onToggle={() => updateSetting('notificationsEnabled', !settings.notificationsEnabled)}
      />
    </div>
  );

  const renderGamifiedSettings = () => (
    <div className="space-y-4">
      <SettingRow
        title="Modo Hardcore"
        description="Penalidades mais severas, mas XP e moedas sobem mais rápido"
        setting="hardcoreMode"
        value={settings.hardcoreMode}
        locked={isSettingLocked('hardcoreMode', gameState.level, achievements)}
        lockReason="🔒 Desbloqueie no Nível 15 ou com a conquista 'Transformação'"
        onToggle={() => updateSetting('hardcoreMode', !settings.hardcoreMode)}
      />
      
      <SettingRow
        title="Modo Férias"
        description="Pausa punições temporariamente, ideal para viagens ou imprevistos"
        setting="vacationMode"
        value={settings.vacationMode}
        onToggle={() => updateSetting('vacationMode', !settings.vacationMode)}
      />
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-quest-accent bg-clip-text text-transparent flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Configurações
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {SETTINGS_CATEGORIES.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                <span className="mr-1">{category.icon}</span>
                <span className="hidden sm:inline">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="visual" className="space-y-4 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">🎨 Personalização Visual</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Customize a aparência do seu perfil e interface
              </p>
              {renderVisualSettings()}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">📲 Notificações Globais</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Controle como você recebe alertas do sistema
              </p>
              {renderNotificationSettings()}
            </div>
          </TabsContent>

          <TabsContent value="gamified" className="space-y-4 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">🏆 Funcionalidades Gamificadas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Modos especiais que alteram a experiência de jogo
              </p>
              {renderGamifiedSettings()}
            </div>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={resetSettings}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Resetar
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 bg-quest-gradient hover:opacity-90"
          >
            Salvar Configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGame } from '@/contexts/GameContext';
import { XpUpSettings, getSettingsLocks } from '@/types/settings';
import { Lock, Palette, Bell, Zap, Shield, Plane, HelpCircle, RotateCcw, Calendar, CheckSquare, Plus, Target, Clock } from 'lucide-react';

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
      <DialogContent className="max-w-2xl bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary flex items-center gap-2">
            <Zap className="h-5 w-5" />
            XpUp - Configurações & Ajuda
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Configurações
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Ajuda
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <ScrollArea className="max-h-[60vh] pr-2">
              <div className="space-y-6">
                {/* Personalização Visual */}
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
                                : 'Adiciona efeitos visuais à barra de experiência'
                              }
                            </span>
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

            <Separator className="bg-border my-4" />

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
          </TabsContent>

          <TabsContent value="help">
            <ScrollArea className="max-h-[60vh] pr-2">
              <div className="space-y-6">
                {/* Como usar o XpUp */}
                <Card className="p-4 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-800/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5 text-cyan-400" />
                    <h2 className="text-lg font-bold text-cyan-400">Como usar o XpUp</h2>
                  </div>
                  <div className="text-sm text-gray-300 space-y-2">
                    <p>🎮 <strong>XpUp</strong> transforma suas tarefas em um jogo! Você ganha XP, sobe de nível e coleciona conquistas.</p>
                    <p>📊 Acompanhe seu progresso através das estatísticas: <strong>HP</strong> (vida), <strong>XP</strong> (experiência), <strong>Moedas</strong> e <strong>Nível</strong>.</p>
                    <p>🎯 Use o botão <strong>"Nova Quest"</strong> para criar diferentes tipos de tarefas e organize sua vida de forma divertida!</p>
                  </div>
                </Card>

                {/* Tipos de Tarefas */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                    <CheckSquare className="h-5 w-5" />
                    Tipos de Tarefas
                  </h3>

                  {/* Hábitos */}
                  <Card className="p-4 bg-card/50 border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <RotateCcw className="h-4 w-4 text-green-400" />
                      <h4 className="font-semibold text-green-400">🔄 Hábito (Habits)</h4>
                    </div>
                    <div className="text-sm space-y-2 text-muted-foreground">
                      <p>São ações que você pode repetir ao longo do dia, podendo ser:</p>
                      <div className="ml-4 space-y-1">
                        <p>• <strong className="text-green-300">Positivas:</strong> que te recompensam (Ex: beber água, praticar gratidão)</p>
                        <p>• <strong className="text-red-300">Negativas:</strong> que geram penalidades (Ex: procrastinar, dormir tarde)</p>
                      </div>
                      <p className="mt-3 p-2 bg-blue-900/20 border border-blue-800/30 rounded text-blue-300">
                        💡 <strong>Como usar:</strong> Você pode registrar essas ações várias vezes por dia, e o sistema acompanha seu progresso ou falhas.
                      </p>
                    </div>
                  </Card>

                  {/* Dailies */}
                  <Card className="p-4 bg-card/50 border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-blue-400" />
                      <h4 className="font-semibold text-blue-400">📅 Tarefas Diárias (Dailies)</h4>
                    </div>
                    <div className="text-sm space-y-2 text-muted-foreground">
                      <p>Atividades recorrentes que precisam ser feitas em uma frequência específica:</p>
                      <div className="ml-4 space-y-1">
                        <p>• Todos os dias</p>
                        <p>• Somente em dias da semana definidos</p>
                        <p>• Ou em ciclos semanais</p>
                      </div>
                      <div className="mt-3 p-2 bg-red-900/20 border border-red-800/30 rounded text-red-300">
                        ⚠️ <strong>Atenção:</strong> Se não forem concluídas no dia ou ciclo correto, você perde pontos de vida ou streak.
                      </div>
                      <div className="mt-3 space-y-1">
                        <p><strong>Exemplos:</strong></p>
                        <p>✔️ Estudar inglês toda segunda</p>
                        <p>✔️ Ir à academia 3x por semana</p>
                        <p>✔️ Meditar diariamente</p>
                      </div>
                    </div>
                  </Card>

                  {/* To-Dos */}
                  <Card className="p-4 bg-card/50 border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckSquare className="h-4 w-4 text-purple-400" />
                      <h4 className="font-semibold text-purple-400">✅ Afazeres Únicos (To-Dos)</h4>
                    </div>
                    <div className="text-sm space-y-2 text-muted-foreground">
                      <p>Tarefas pontuais que você faz uma vez e pronto:</p>
                      <div className="ml-4 space-y-1">
                        <p>• Podem ter prazo final ou não</p>
                        <p>• Somem da lista ao serem concluídas</p>
                        <p>• Quanto mais rápido concluir, maior a recompensa</p>
                      </div>
                      <div className="mt-3 space-y-1">
                        <p><strong>Exemplos:</strong></p>
                        <p>✔️ Finalizar relatório do trabalho</p>
                        <p>✔️ Comprar material de escritório</p>
                        <p>✔️ Agendar consulta médica</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Dicas de Uso */}
                <Card className="p-4 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-800/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <h4 className="font-semibold text-yellow-400">💡 Dicas para Maximizar sua Experiência</h4>
                  </div>
                  <div className="text-sm space-y-2 text-gray-300">
                    <p>🎯 <strong>Comece pequeno:</strong> Crie poucos hábitos e dailies no início</p>
                    <p>⏰ <strong>Seja realista:</strong> Defina metas alcançáveis para manter a motivação</p>
                    <p>🏆 <strong>Celebre conquistas:</strong> Acompanhe seu progresso e comemore os marcos</p>
                    <p>🔄 <strong>Ajuste conforme necessário:</strong> Edite ou remova tarefas que não fazem mais sentido</p>
                    <p>📱 <strong>Use diariamente:</strong> Quanto mais consistente, melhores os resultados!</p>
                  </div>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

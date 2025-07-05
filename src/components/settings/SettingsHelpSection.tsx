import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleHelp, ChevronDown, ChevronUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

export const SettingsHelpSection = () => {
  return (
    <Card className="p-4 bg-card/50 border-border">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <CircleHelp className="h-5 w-5 text-cyan-400" />
          <h3 className="font-semibold text-cyan-400">Precisa de Ajuda?</h3>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          Tem dúvidas sobre como usar as configurações ou o sistema? Clique no botão abaixo para obter ajuda.
        </p>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="outline"
              className="w-full border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
            >
              <CircleHelp className="h-4 w-4 mr-2" />
              Obter Ajuda
            </Button>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-full sm:max-w-2xl flex flex-col h-full">
            <SheetHeader className="flex-shrink-0">
              <SheetTitle className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                <CircleHelp className="h-5 w-5" />
                Central de Ajuda XpUp
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 min-h-0 mt-6">
              <ScrollArea className="h-full">
                <div className="space-y-6 pr-4 pb-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="habits">
                      <AccordionTrigger className="text-left">
                        🔄 Hábitos (Habits)
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground space-y-2">
                        <p>São ações que você pode repetir ao longo da quest, podendo ser:</p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li><strong>Positivas:</strong> que te recompensam (Ex: beber água, praticar gratidão)</li>
                          <li><strong>Negativas:</strong> que geram penalidades (Ex: procrastinar, dormir tarde)</li>
                        </ul>
                        <p>Você pode registrar essas ações várias vezes por quest, e o sistema acompanha seu progresso ou falhas.</p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="dailies">
                      <AccordionTrigger className="text-left">
                        📅 Tarefas Diárias (Dailies)
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground space-y-2">
                        <p>Atividades recorrentes que precisam ser feitas em uma frequência específica:</p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Todas as quests</li>
                          <li>Somente em quests da semana definidas</li>
                          <li>Ou em ciclos semanais</li>
                        </ul>
                        <p>Se não forem concluídas na quest ou ciclo correto, você perde pontos de vida ou streak.</p>
                        <div className="mt-2">
                          <p className="font-medium">Exemplos:</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>📚 Estudar inglês toda segunda</li>
                            <li>🏋️ Ir à academia 3x por semana</li>
                            <li>🧘 Meditar em toda quest</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="todos">
                      <AccordionTrigger className="text-left">
                        ✅ Afazeres Únicos (To-Dos)
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground space-y-2">
                        <p>Tarefas pontuais que você faz uma vez e pronto:</p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Podem ter prazo final ou não</li>
                          <li>Somem da lista ao serem concluídas</li>
                          <li>Quanto mais rápido concluir, maior a recompensa</li>
                        </ul>
                        <div className="mt-2">
                          <p className="font-medium">Exemplos:</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>📄 Finalizar relatório do trabalho</li>
                            <li>🛒 Comprar material de escritório</li>
                            <li>🏥 Agendar consulta médica</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="gamification">
                      <AccordionTrigger className="text-left">
                        🎮 Funcionalidades Gamificadas
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground space-y-3">
                        <div>
                          <p className="font-medium text-red-400 mb-2">🔥 Modo Hardcore:</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li><strong>Recompensas aumentadas:</strong> Ganhe 50% mais XP e moedas</li>
                            <li><strong>Penalidades severas:</strong> Perde mais HP por hábitos negativos (15 ao invés de 10)</li>
                            <li><strong>Desafio intenso:</strong> Para jogadores experientes que querem mais emoção</li>
                            <li><strong>Desbloqueio:</strong> Disponível no nível 15 ou com a conquista "Transformação"</li>
                          </ul>
                        </div>
                        
                        <div>
                          <p className="font-medium text-blue-400 mb-2">✈️ Modo Férias:</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li><strong>Proteção temporária:</strong> Pausa todas as penalidades</li>
                            <li><strong>Sem perda de HP:</strong> Hábitos negativos não causam dano</li>
                            <li><strong>Mantém streak:</strong> Sua sequência não é quebrada por dailies perdidas</li>
                            <li><strong>Uso consciente:</strong> Ideal para períodos de descanso ou viagens</li>
                          </ul>
                        </div>

                        <div>
                          <p className="font-medium text-purple-400 mb-2">📊 Sistema de Progressão:</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li><strong>Níveis:</strong> De 0 a 100, cada nível exige mais XP que o anterior</li>
                            <li><strong>Pontos de Vida (HP):</strong> Representa sua motivação, perdido com hábitos ruins</li>
                            <li><strong>Experiência (XP):</strong> Ganha completando tarefas, usado para subir de nível</li>
                            <li><strong>Moedas:</strong> Obtidas com tarefas, usadas na loja para personalização</li>
                            <li><strong>Streak:</strong> Quests consecutivas completando dailies</li>
                          </ul>
                        </div>

                        <div>
                          <p className="font-medium text-yellow-400 mb-2">🏆 Sistema de Conquistas:</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li><strong>Marcos de progresso:</strong> Desbloqueadas ao atingir objetivos específicos</li>
                            <li><strong>Funcionalidades extras:</strong> Algumas conquistas desbloqueiam novos recursos</li>
                            <li><strong>Reconhecimento:</strong> Mostram seu progresso e dedicação no sistema</li>
                            <li><strong>Variedade:</strong> Diferentes tipos: níveis, tarefas, streaks, etc.</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="how-to-use">
                      <AccordionTrigger className="text-left">
                        🚀 Como Usar o Site
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground space-y-3">
                        <div>
                          <p className="font-medium text-cyan-400 mb-2">Começando:</p>
                          <ol className="list-decimal pl-4 space-y-1">
                            <li>Use o botão "+" para criar suas primeiras tarefas</li>
                            <li>Escolha o tipo: Hábito, Daily ou To-Do</li>
                            <li>Defina dificuldade e recompensas</li>
                            <li>Complete as tarefas para ganhar XP e moedas</li>
                          </ol>
                        </div>
                        
                        <div>
                          <p className="font-medium text-cyan-400 mb-2">Dicas Importantes:</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Complete dailies todas as quests para manter sua streak</li>
                            <li>Use hábitos positivos para ganhar XP extra</li>
                            <li>Evite hábitos negativos para não perder pontos</li>
                            <li>Conquiste achievements para desbloquear novos recursos</li>
                            <li>Use moedas na loja para personalizar seu perfil</li>
                          </ul>
                        </div>

                        <div>
                          <p className="font-medium text-cyan-400 mb-2">Navegação:</p>
                          <ul className="list-disc pl-4 space-y-1">
                            <li><strong>Dashboard:</strong> Veja todas suas tarefas</li>
                            <li><strong>Perfil:</strong> Acompanhe estatísticas e personalize</li>
                            <li><strong>Conquistas:</strong> Veja seu progresso</li>
                            <li><strong>Configurações:</strong> Ajuste preferências</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
};


import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleHelp, ChevronDown, ChevronUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const SettingsHelpSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleHelp = () => {
    setIsExpanded(!isExpanded);
  };

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
        
        <Button 
          onClick={handleToggleHelp}
          variant="outline"
          className="w-full border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
        >
          <CircleHelp className="h-4 w-4 mr-2" />
          {isExpanded ? 'Ocultar Ajuda' : 'Obter Ajuda'}
          {isExpanded ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
        </Button>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="habits">
                <AccordionTrigger className="text-left">
                  🔄 Hábitos (Habits)
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>São ações que você pode repetir ao longo do dia, podendo ser:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Positivas:</strong> que te recompensam (Ex: beber água, praticar gratidão)</li>
                    <li><strong>Negativas:</strong> que geram penalidades (Ex: procrastinar, dormir tarde)</li>
                  </ul>
                  <p>Você pode registrar essas ações várias vezes por dia, e o sistema acompanha seu progresso ou falhas.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="dailies">
                <AccordionTrigger className="text-left">
                  📅 Tarefas Diárias (Dailies)
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>Atividades recorrentes que precisam ser feitas em uma frequência específica:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Todos os dias</li>
                    <li>Somente em dias da semana definidos</li>
                    <li>Ou em ciclos semanais</li>
                  </ul>
                  <p>Se não forem concluídas no dia ou ciclo correto, você perde pontos de vida ou streak.</p>
                  <div className="mt-2">
                    <p className="font-medium">Exemplos:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>📚 Estudar inglês toda segunda</li>
                      <li>🏋️ Ir à academia 3x por semana</li>
                      <li>🧘 Meditar diariamente</li>
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
                      <li>Complete dailies todos os dias para manter sua streak</li>
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
        )}
      </div>
    </Card>
  );
};

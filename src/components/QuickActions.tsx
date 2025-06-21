
import React from 'react';
import { Plus, Zap, Trophy, ShoppingBag, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: 'Nova Quest',
      description: 'Criar nova tarefa',
      variant: 'default' as const
    },
    {
      icon: Trophy,
      label: 'Conquistas',
      description: 'Ver progresso',
      variant: 'outline' as const
    },
    {
      icon: ShoppingBag,
      label: 'Loja',
      description: 'Comprar itens',
      variant: 'outline' as const
    },
    {
      icon: Settings,
      label: 'Configurações',
      description: 'Ajustar perfil',
      variant: 'outline' as const
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="quest-card">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Ações Rápidas
          </h3>
          
          <div className="space-y-3">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant={action.variant}
                  className="w-full justify-start h-auto p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{action.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Level Progress */}
      <Card className="quest-card">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Próximo Nível</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Nível 12</span>
              <span>Nível 13</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill bg-xp-gradient"
                style={{ width: '62%' }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              755 XP restantes
            </p>
          </div>
        </div>
      </Card>

      {/* Achievements Preview */}
      <Card className="quest-card">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Conquistas Recentes</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-quest-legendary/10">
              <div className="w-8 h-8 rounded-full bg-quest-legendary/20 flex items-center justify-center">
                <Trophy className="h-4 w-4 text-quest-legendary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Streak Master</div>
                <div className="text-xs text-muted-foreground">7 dias consecutivos</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

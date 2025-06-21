
import React from 'react';
import { Shield, Crown, Coins, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-quest-legendary rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-quest-accent bg-clip-text text-transparent">
                TaskQuest
              </h1>
              <p className="text-xs text-muted-foreground">Gamifique suas tarefas</p>
            </div>
          </div>

          {/* Player Stats */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 stat-badge bg-hp-high/20 text-hp-high">
              <Heart className="h-4 w-4" />
              <span className="font-mono">85/100</span>
            </div>
            
            <div className="flex items-center gap-2 stat-badge bg-xp-bar/20 text-xp-glow">
              <Zap className="h-4 w-4" />
              <span className="font-mono">1,245 XP</span>
            </div>
            
            <div className="flex items-center gap-2 stat-badge bg-quest-legendary/20 text-quest-legendary">
              <Coins className="h-4 w-4" />
              <span className="font-mono">342</span>
            </div>
            
            <div className="flex items-center gap-2 stat-badge bg-quest-primary/20 text-quest-primary">
              <Crown className="h-4 w-4" />
              <span className="font-mono">Nível 12</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Perfil
            </Button>
            <Button size="sm" className="bg-quest-gradient hover:opacity-90">
              Nova Quest
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

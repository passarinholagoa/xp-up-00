
import React from 'react';
import { Shield, Crown, Coins, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';

export const Header = () => {
  const { gameState, createNewQuest, openProfile, profile } = useGame();

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

          {/* Player Profile & Stats */}
          <div className="hidden md:flex items-center gap-4">
            {/* Profile Preview */}
            <div 
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all hover:bg-primary/10 ${profile.backgroundColor} ${profile.frameBorder}`}
              onClick={openProfile}
            >
              <div className="w-8 h-8 rounded-full bg-quest-gradient flex items-center justify-center text-sm">
                {profile.avatar}
              </div>
              <span className={`text-sm font-medium ${profile.nameColor}`}>
                {profile.displayName}
              </span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 stat-badge bg-hp-high/20 text-hp-high">
              <Heart className="h-4 w-4" />
              <span className="font-mono">{gameState.hp}/{gameState.maxHp}</span>
            </div>
            
            <div className="flex items-center gap-2 stat-badge bg-xp-bar/20 text-xp-glow">
              <Zap className="h-4 w-4" />
              <span className="font-mono">{gameState.xp.toLocaleString()} XP</span>
            </div>
            
            <div className="flex items-center gap-2 stat-badge bg-quest-legendary/20 text-quest-legendary">
              <Coins className="h-4 w-4" />
              <span className="font-mono">{gameState.coins}</span>
            </div>
            
            <div className="flex items-center gap-2 stat-badge bg-quest-primary/20 text-quest-primary">
              <Crown className="h-4 w-4" />
              <span className="font-mono">Nível {gameState.level}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex"
              onClick={openProfile}
            >
              Perfil
            </Button>
            <Button 
              size="sm" 
              className="bg-quest-gradient hover:opacity-90"
              onClick={createNewQuest}
            >
              Nova Quest
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};


import React, { useState } from 'react';
import { Crown, Coins, Heart, Zap, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const Header = () => {
  const { gameState, createNewQuest, openProfile, profile } = useGame();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/lovable-uploads/88cf0038-6fd4-4fe2-a514-2cc60714a3a2.png" 
                alt="XPJP Logo" 
                className="h-10 w-10 object-contain"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-quest-legendary rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#FF6B35]">
                XpUp
              </h1>
              <p className="text-xs text-muted-foreground">Gamifique suas tarefas</p>
            </div>
          </div>

          {/* Desktop Stats & Profile */}
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

          {/* Mobile & Desktop Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  
                  <div className="space-y-6 mt-6">
                    {/* Mobile Profile Preview */}
                    <div 
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-primary/10 ${profile.backgroundColor} ${profile.frameBorder}`}
                      onClick={() => {
                        openProfile();
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="w-10 h-10 rounded-full bg-quest-gradient flex items-center justify-center text-lg">
                        {profile.avatar}
                      </div>
                      <div>
                        <span className={`text-base font-medium ${profile.nameColor}`}>
                          {profile.displayName}
                        </span>
                        <p className="text-sm text-muted-foreground">Ver Perfil</p>
                      </div>
                    </div>

                    {/* Mobile Stats */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                        Stats
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 stat-badge bg-hp-high/20 text-hp-high">
                          <Heart className="h-4 w-4" />
                          <span className="font-mono text-sm">{gameState.hp}/{gameState.maxHp}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 stat-badge bg-quest-primary/20 text-quest-primary">
                          <Crown className="h-4 w-4" />
                          <span className="font-mono text-sm">Nv {gameState.level}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 stat-badge bg-xp-bar/20 text-xp-glow">
                          <Zap className="h-4 w-4" />
                          <span className="font-mono text-xs">{gameState.xp.toLocaleString()} XP</span>
                        </div>
                        
                        <div className="flex items-center gap-2 stat-badge bg-quest-legendary/20 text-quest-legendary">
                          <Coins className="h-4 w-4" />
                          <span className="font-mono text-sm">{gameState.coins}</span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                        Ações
                      </h3>
                      
                      <Button 
                        className="w-full bg-quest-gradient hover:opacity-90"
                        onClick={() => {
                          createNewQuest();
                          setIsMenuOpen(false);
                        }}
                      >
                        Nova Quest
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
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

            {/* Mobile Nova Quest Button (visible sempre) */}
            <div className="md:hidden">
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
      </div>
    </header>
  );
};

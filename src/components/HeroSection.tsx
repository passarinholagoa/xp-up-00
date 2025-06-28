
import React from 'react';
import { Sword, Target, Trophy } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-quest-gradient p-8 text-white">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">Bem-vindo, Aventureiro!</h2>
              <p className="text-lg opacity-90">
                Transforme suas tarefas em épicas aventuras. Ganhe XP, suba de nível e torne-se o herói da sua própria história.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                <Sword className="h-5 w-5" />
                <span className="font-medium">5 Quests Ativas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                <Target className="h-5 w-5" />
                <span className="font-medium">3 Dailies</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                <Trophy className="h-5 w-5" />
                <span className="font-medium">12 Conquistas</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-64 h-64 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-6xl font-bold">12</div>
                  <div className="text-xl opacity-80">Nível</div>
                  <div className="w-32 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
                    <div className="w-3/4 h-full bg-quest-legendary rounded-full" />
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 rounded-full border-2 border-quest-legendary/50 animate-pulse-glow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


import React from 'react';
import { Sword, Target, Trophy } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

export const HeroSection = () => {
  const { gameState, habits, dailies, todos, achievements, settings } = useGame();
  
  // Calculate active quests (todos not completed)
  const activeQuests = todos.filter(todo => !todo.completed).length;
  
  // Calculate dailies not completed today
  const activeDailies = dailies.filter(daily => !daily.completed).length;
  
  // Calculate unlocked achievements
  const unlockedAchievements = achievements.filter(achievement => achievement.unlocked).length;
  
  // Calculate progress percentage for the progress bar
  const progressPercentage = (gameState.xp / gameState.maxXp) * 100;

  return (
    <section className="relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl" style={{ backgroundColor: '#211C58' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30" />
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Welcome Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Bem-vindo, Aventureiro!
              </h1>
              <p className="text-lg lg:text-xl opacity-90 leading-relaxed">
                Transforme suas tarefas em épicas aventuras. Ganhe XP, suba de nível e torne-se o herói da sua própria história.
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Sword className="h-5 w-5 text-orange-300" />
                </div>
                <div>
                  <div className="font-semibold text-lg">{activeQuests}</div>
                  <div className="text-sm opacity-80">Quests Ativas</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Target className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <div className="font-semibold text-lg">{activeDailies}</div>
                  <div className="text-sm opacity-80">Dailies</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Trophy className="h-5 w-5 text-yellow-300" />
                </div>
                <div>
                  <div className="font-semibold text-lg">{unlockedAchievements}</div>
                  <div className="text-sm opacity-80">Conquistas</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Level Circle */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center shadow-2xl">
                <div className="text-center space-y-2">
                  <div className={`text-5xl lg:text-6xl font-bold ${settings.animatedXpBar ? 'animate-[color-change_3s_ease-in-out_infinite]' : 'text-white'}`}>
                    {gameState.level}
                  </div>
                  <div className="text-lg opacity-80">Nível</div>
                  <div className="w-24 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-quest-legendary to-yellow-300 rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="text-xs opacity-70">
                    {gameState.xp}/{gameState.maxXp} XP
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

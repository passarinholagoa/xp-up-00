
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/contexts/GameContext';

interface AnimatedXpBarProps {
  xp: number;
  maxXp: number;
  className?: string;
}

export const AnimatedXpBar = ({ xp, maxXp, className }: AnimatedXpBarProps) => {
  const { settings } = useGame();
  
  const progressValue = maxXp > 0 ? (xp / maxXp) * 100 : 0;
  
  return (
    <div className={className}>
      <Progress 
        value={progressValue} 
        className={`h-2 ${settings.animatedXpBar ? 'transition-all duration-1000 ease-out' : ''}`}
      />
      {settings.animatedXpBar && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      )}
    </div>
  );
};

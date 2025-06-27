
import React from 'react';
import { Card } from '@/components/ui/card';
import { Achievement } from '@/types/achievements';

interface SettingsInfoSectionProps {
  level: number;
  achievements: Achievement[];
}

export const SettingsInfoSection = ({ level, achievements }: SettingsInfoSectionProps) => {
  return (
    <Card className="p-3 bg-blue-900/20 border-blue-800">
      <div className="text-xs text-blue-300">
        <p className="mb-1">🔒 <strong>Nível Atual:</strong> {level}</p>
        <p className="mb-1">🏆 <strong>Conquistas:</strong> {achievements.filter(a => a.unlocked).length}/{achievements.length}</p>
        <p className="text-blue-400">
          Algumas configurações são desbloqueadas conforme você progride no jogo!
        </p>
      </div>
    </Card>
  );
};

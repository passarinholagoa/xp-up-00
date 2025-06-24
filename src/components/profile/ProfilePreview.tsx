
import React from 'react';
import { Card } from '@/components/ui/card';
import { ProfileCustomization } from '@/types/profile';

interface ProfilePreviewProps {
  profile: ProfileCustomization;
  gameState: {
    level: number;
    coins: number;
    totalXp: number;
  };
}

export const ProfilePreview = ({ profile, gameState }: ProfilePreviewProps) => {
  return (
    <div className="w-80 space-y-4">
      <h3 className="text-base font-bold text-white">Pré-visualização</h3>
      <Card className="p-4 bg-gray-900/50 border-gray-800">
        <div className={`relative p-4 rounded-lg ${profile.backgroundColor} ${profile.frameBorder}`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-lg">
              {profile.avatar}
            </div>
            <div>
              <h4 className={`text-base font-bold ${profile.nameColor}`}>
                {profile.displayName || 'Aventureiro'}
              </h4>
              <p className="text-xs text-gray-300">
                Nível {gameState.level} • {gameState.coins} moedas • {gameState.totalXp.toLocaleString()} XP
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

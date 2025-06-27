
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Settings, ShoppingBag } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { LogoutButton } from '@/components/LogoutButton';
import { useAuth } from '@/contexts/AuthContext';

export const Header = () => {
  const { gameState, openAchievements, openProfile, openSettings, profile } = useGame();
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Avatar customizado com perfil */}
            <div className={`relative ${profile.backgroundColor} ${profile.frameBorder} p-3 rounded-lg`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl">
                  {profile.avatar}
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${profile.nameColor}`}>
                    {profile.displayName || user?.name || 'Aventureiro'}
                  </h2>
                  <p className="text-purple-200 text-sm">Nível {gameState.level}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={openAchievements}
              className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
            >
              <Trophy className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={openProfile}
              className="text-purple-300 hover:text-purple-200 hover:bg-purple-400/10"
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={openSettings}
              className="text-gray-300 hover:text-gray-200 hover:bg-gray-400/10"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <LogoutButton />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

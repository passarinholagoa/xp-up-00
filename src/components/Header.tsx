
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Settings, ShoppingBag, Menu, X } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { LogoutButton } from '@/components/LogoutButton';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header = () => {
  const { gameState, openAchievements, openProfile, openSettings, profile } = useGame();
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <div className="container mx-auto px-4">
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
            
            {/* Desktop Menu */}
            {!isMobile && (
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={openAchievements}
                  className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 h-12 w-12"
                >
                  <Trophy className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={openProfile}
                  className="text-purple-300 hover:text-purple-200 hover:bg-purple-400/10 h-12 w-12"
                >
                  <ShoppingBag className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={openSettings}
                  className="text-gray-300 hover:text-gray-200 hover:bg-gray-400/10 h-12 w-12"
                >
                  <Settings className="h-6 w-6" />
                </Button>
                <div className="ml-2">
                  <LogoutButton />
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={toggleMobileMenu}
                  className="text-white hover:bg-white/10 h-12 w-12"
                >
                  {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>

                {/* Mobile Dropdown Menu */}
                {showMobileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900/95 backdrop-blur-sm border border-purple-500/30 rounded-lg shadow-xl z-50">
                    <div className="p-2 space-y-1">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          openAchievements();
                          setShowMobileMenu(false);
                        }}
                        className="w-full justify-start text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                      >
                        <Trophy className="h-5 w-5 mr-3" />
                        Conquistas
                      </Button>
                      
                      <Button
                        variant="ghost"
                        onClick={() => {
                          openProfile();
                          setShowMobileMenu(false);
                        }}
                        className="w-full justify-start text-purple-300 hover:text-purple-200 hover:bg-purple-400/10"
                      >
                        <ShoppingBag className="h-5 w-5 mr-3" />
                        Perfil
                      </Button>
                      
                      <Button
                        variant="ghost"
                        onClick={() => {
                          openSettings();
                          setShowMobileMenu(false);
                        }}
                        className="w-full justify-start text-gray-300 hover:text-gray-200 hover:bg-gray-400/10"
                      >
                        <Settings className="h-5 w-5 mr-3" />
                        Configurações
                      </Button>
                      
                      <div className="pt-2 border-t border-purple-500/30">
                        <div onClick={() => setShowMobileMenu(false)}>
                          <LogoutButton />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

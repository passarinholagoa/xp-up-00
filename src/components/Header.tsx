
import React, { useState, useCallback, useMemo } from 'react';
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useIsMobile();

  // Otimizações com useCallback para evitar re-renders desnecessários
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(prev => !prev);
  }, []);

  const handleAchievements = useCallback(() => {
    openAchievements();
    setShowMobileMenu(false);
  }, [openAchievements]);

  const handleProfile = useCallback(() => {
    openProfile();
    setShowMobileMenu(false);
  }, [openProfile]);

  const handleSettings = useCallback(() => {
    openSettings();
    setShowMobileMenu(false);
  }, [openSettings]);

  // Memoização do nome do usuário - priorizar o displayName do perfil
  const displayName = useMemo(() => {
    console.log('Profile displayName:', profile.displayName);
    console.log('User email:', user?.email);
    
    // Se o displayName estiver vazio ou for "Aventureiro", usar "Carlos"
    if (!profile.displayName || profile.displayName === 'Aventureiro' || profile.displayName === 'Carregando...') {
      return 'Carlos';
    }
    
    return profile.displayName;
  }, [profile.displayName, user?.email]);

  // Memoização das classes CSS para evitar reconstrução
  const avatarClasses = useMemo(() => 
    `relative ${profile.backgroundColor} ${profile.frameBorder} p-3 rounded-lg`,
    [profile.backgroundColor, profile.frameBorder]
  );

  const nameClasses = useMemo(() => 
    `text-xl font-bold ${profile.nameColor}`,
    [profile.nameColor]
  );

  // Debug log para verificar o nome que está sendo exibido
  console.log('Displaying name:', displayName);

  return (
    <div className={isMobile ? 'px-4' : 'container mx-auto px-4'}>
      <Card className="mb-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar otimizado */}
              <div className={avatarClasses}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl">
                    {profile.avatar}
                  </div>
                  <div>
                    <h2 className={nameClasses}>
                      {displayName}
                    </h2>
                    <p className="text-purple-200 text-sm">Nível {gameState.level}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Desktop Menu - sem mudanças */}
            {!isMobile && (
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={openAchievements}
                  className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 h-12 w-12 transition-colors duration-200"
                >
                  <Trophy className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={openProfile}
                  className="text-purple-300 hover:text-purple-200 hover:bg-purple-400/10 h-12 w-12 transition-colors duration-200"
                >
                  <ShoppingBag className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={openSettings}
                  className="text-gray-300 hover:text-gray-200 hover:bg-gray-400/10 h-12 w-12 transition-colors duration-200"
                >
                  <Settings className="h-6 w-6" />
                </Button>
                <div className="ml-2">
                  <LogoutButton />
                </div>
              </div>
            )}

            {/* Mobile Menu Button - otimizado */}
            {isMobile && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={toggleMobileMenu}
                  className="text-white hover:bg-white/10 h-12 w-12 transition-all duration-200 will-change-transform"
                  aria-label={showMobileMenu ? "Fechar menu" : "Abrir menu"}
                >
                  <div className={`transition-transform duration-200 ${showMobileMenu ? 'rotate-90' : ''}`}>
                    {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </div>
                </Button>

                {/* Mobile Dropdown Menu - otimizado com transições suaves */}
                <div className={`
                  absolute right-0 top-full mt-2 w-48 
                  bg-gray-900/95 backdrop-blur-sm border border-purple-500/30 
                  rounded-lg shadow-xl z-50
                  transform origin-top-right
                  transition-all duration-200 ease-out
                  ${showMobileMenu 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }
                `}>
                  <div className="p-2 space-y-1">
                    <Button
                      variant="ghost"
                      onClick={handleAchievements}
                      className="w-full justify-start text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 transition-colors duration-150"
                    >
                      <Trophy className="h-5 w-5 mr-3" />
                      Conquistas
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={handleProfile}
                      className="w-full justify-start text-purple-300 hover:text-purple-200 hover:bg-purple-400/10 transition-colors duration-150"
                    >
                      <ShoppingBag className="h-5 w-5 mr-3" />
                      Perfil
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={handleSettings}
                      className="w-full justify-start text-gray-300 hover:text-gray-200 hover:bg-gray-400/10 transition-colors duration-150"
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
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

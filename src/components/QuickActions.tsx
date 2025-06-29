
import React from 'react';
import { Trophy, Star, ShoppingBag, Coins } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { useIsMobile } from '@/hooks/use-mobile';

export const QuickActions = () => {
  const { openAchievements, openProfile, gameState, shopItems } = useGame();
  const isMobile = useIsMobile();

  // Pegar alguns itens da loja para mostrar em destaque
  const featuredShopItems = shopItems
    .filter(item => !item.owned && item.unlocked)
    .slice(0, 3);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Achievements Preview */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20 backdrop-blur-sm">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-yellow-500/20 rounded-lg">
              <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg">Conquistas</h3>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-yellow-400">Streak Master</div>
                <div className="text-xs text-muted-foreground">{gameState.streak} dias consecutivos</div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-yellow-500/10 border border-yellow-500/20 rounded-xl transition-all duration-200"
              onClick={openAchievements}
            >
              Ver todas as conquistas →
            </Button>
          </div>
        </div>
      </Card>

      {/* Shop Preview - Only on Desktop */}
      {!isMobile && (
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 backdrop-blur-sm">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-base sm:text-lg">Loja</h3>
              <div className="flex items-center gap-1 ml-auto text-xs text-yellow-400">
                <Coins className="h-3 w-3" />
                <span>{gameState.coins}</span>
              </div>
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              {featuredShopItems.length > 0 ? (
                <>
                  {featuredShopItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-purple-400 truncate">{item.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Coins className="h-3 w-3" />
                          {item.price}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-purple-500/10 border border-purple-500/20 rounded-xl transition-all duration-200"
                    onClick={openProfile}
                  >
                    Ver toda a loja →
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-purple-400">Personalize seu perfil</div>
                      <div className="text-xs text-muted-foreground">Desbloqueie itens completando missões</div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-purple-500/10 border border-purple-500/20 rounded-xl transition-all duration-200"
                    onClick={openProfile}
                  >
                    Abrir loja →
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

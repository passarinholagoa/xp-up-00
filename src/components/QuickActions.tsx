
import React from 'react';
import { Trophy, Star, ShoppingBag, Coins } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { useIsMobile } from '@/hooks/use-mobile';

export const QuickActions = () => {
  const { openAchievements, openProfile, gameState, shopItems } = useGame();
  const isMobile = useIsMobile();

  // Pegar mais itens da loja para mostrar em destaque
  const featuredShopItems = shopItems
    .filter(item => !item.owned && item.unlocked)
    .slice(0, 6);

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
                  <div className="grid grid-cols-1 gap-2">
                    {featuredShopItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-200">
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
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                          item.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400' :
                          item.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {item.rarity === 'legendary' ? 'Lendário' :
                           item.rarity === 'epic' ? 'Épico' :
                           item.rarity === 'rare' ? 'Raro' : 'Comum'}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Categorias em destaque */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                      <div className="text-sm font-semibold text-green-400">🖼️ Fundos</div>
                      <div className="text-xs text-muted-foreground">Personalização</div>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                      <div className="text-sm font-semibold text-blue-400">🎨 Cores</div>
                      <div className="text-xs text-muted-foreground">Temáticas</div>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                      <div className="text-sm font-semibold text-orange-400">🖥️ Molduras</div>
                      <div className="text-xs text-muted-foreground">Bordas especiais</div>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20">
                      <div className="text-sm font-semibold text-pink-400">👤 Avatares</div>
                      <div className="text-xs text-muted-foreground">Personagens</div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-purple-500/10 border border-purple-500/20 rounded-xl transition-all duration-200 mt-4"
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
                  
                  {/* Itens de amostra quando não há itens disponíveis */}
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/10 opacity-60">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                        🌟
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-purple-300">Avatar Místico</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Coins className="h-3 w-3" />
                          500
                        </div>
                      </div>
                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                        Lendário
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/10 opacity-60">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                        🏖️
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-purple-300">Fundo Praia</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Coins className="h-3 w-3" />
                          150
                        </div>
                      </div>
                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                        Raro
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/10 opacity-60">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
                        🎨
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-purple-300">Cor Dourada</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Coins className="h-3 w-3" />
                          100
                        </div>
                      </div>
                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                        Épico
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-purple-500/10 border border-purple-500/20 rounded-xl transition-all duration-200 mt-4"
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

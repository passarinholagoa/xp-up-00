
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';
import { ShopItem, RARITY_COLORS } from '@/types/profile';
import { Edit, ShoppingBag, User, Palette } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { gameState, profile, updateProfile, shopItems, buyShopItem, achievements } = useGame();
  const [tempProfile, setTempProfile] = useState(profile);

  const handleSaveChanges = () => {
    updateProfile(tempProfile);
    onClose();
  };

  const handleBuyItem = (item: ShopItem) => {
    buyShopItem(item.id);
  };

  const getOwnedItems = (category: string) => {
    return shopItems.filter(item => item.category === category && item.owned);
  };

  const getShopItemsByCategory = (category: string) => {
    return shopItems.filter(item => item.category === category && !item.owned);
  };

  const canBuyItem = (item: ShopItem) => {
    const hasEnoughCoins = gameState.coins >= item.price;
    const hasEnoughXp = !item.xpRequired || gameState.totalXp >= item.xpRequired;
    const hasRequiredAchievement = !item.achievementRequired || 
      achievements.find(a => a.id === item.achievementRequired)?.unlocked;
    
    return hasEnoughCoins && hasEnoughXp && hasRequiredAchievement && !item.owned;
  };

  const getRequirementsText = (item: ShopItem) => {
    let requirements = [`${item.price} 💰`];
    
    if (item.xpRequired) {
      requirements.push(`${item.xpRequired.toLocaleString()} XP`);
    }
    
    if (item.achievementRequired) {
      const achievement = achievements.find(a => a.id === item.achievementRequired);
      requirements.push(`"${achievement?.title}" 🏆`);
    }
    
    return requirements.join(' • ');
  };

  const getMissingRequirements = (item: ShopItem) => {
    let missing = [];
    
    if (gameState.coins < item.price) {
      missing.push(`${item.price - gameState.coins} moedas`);
    }
    
    if (item.xpRequired && gameState.totalXp < item.xpRequired) {
      missing.push(`${item.xpRequired - gameState.totalXp} XP`);
    }
    
    if (item.achievementRequired) {
      const achievement = achievements.find(a => a.id === item.achievementRequired);
      if (!achievement?.unlocked) {
        missing.push(`conquista "${achievement?.title}"`);
      }
    }
    
    return missing;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'text-yellow-400';
      case 'epic': return 'text-purple-400';
      case 'rare': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const categoryNames = {
    frame: 'Molduras',
    color: 'Cores do Nome',
    background: 'Fundos',
    avatar: 'Avatares'
  };

  const ShopCategorySection = ({ category, title }: { category: string; title: string }) => {
    const items = getShopItemsByCategory(category);
    
    if (items.length === 0) return null;

    return (
      <div className="space-y-3">
        <h4 className="font-semibold text-lg flex items-center gap-2">
          {title}
          <Badge variant="outline" className="text-xs">
            {items.length} itens
          </Badge>
        </h4>
        <div className="space-y-2">
          {items.map(item => {
            const canBuy = canBuyItem(item);
            const missingReqs = getMissingRequirements(item);
            
            return (
              <Card key={item.id} className={`p-4 ${RARITY_COLORS[item.rarity]} ${!canBuy ? 'opacity-60' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-medium">{item.name}</h5>
                        <Badge variant="outline" className={`text-xs ${getRarityColor(item.rarity)}`}>
                          {item.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="text-xs text-muted-foreground mt-1">
                        Requisitos: {getRequirementsText(item)}
                      </div>
                      {missingReqs.length > 0 && (
                        <div className="text-xs text-red-500 mt-1">
                          Faltam: {missingReqs.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleBuyItem(item)}
                    disabled={!canBuy}
                    className="flex items-center gap-1"
                  >
                    Comprar
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <User className="h-6 w-6" />
            Perfil Personalizável
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pré-visualização</h3>
            <Card className="p-6">
              <div className={`relative p-6 rounded-lg ${tempProfile.backgroundColor} ${tempProfile.frameBorder}`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-quest-gradient flex items-center justify-center text-2xl">
                    {tempProfile.avatar}
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold ${tempProfile.nameColor}`}>
                      {tempProfile.displayName || 'Seu Nome'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Nível {gameState.level} • {gameState.coins} moedas • {gameState.totalXp.toLocaleString()} XP
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Customization Section */}
          <div className="space-y-4">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">
                  <Edit className="h-4 w-4 mr-2" />
                  Básico
                </TabsTrigger>
                <TabsTrigger value="shop">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Loja
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="displayName">Nome de Exibição</Label>
                    <Input
                      id="displayName"
                      value={tempProfile.displayName}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, displayName: e.target.value }))}
                      placeholder="Digite seu nome"
                    />
                  </div>

                  <div>
                    <Label>Avatar Atual</Label>
                    <div className="flex gap-2 mt-2">
                      {getOwnedItems('avatar').map(item => (
                        <Button
                          key={item.id}
                          variant={tempProfile.avatar === item.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTempProfile(prev => ({ ...prev, avatar: item.value }))}
                        >
                          {item.value}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Cor do Nome</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {getOwnedItems('color').map(item => (
                        <Button
                          key={item.id}
                          variant={tempProfile.nameColor === item.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTempProfile(prev => ({ ...prev, nameColor: item.value }))}
                          className="text-xs"
                        >
                          {item.icon} {item.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Moldura</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {getOwnedItems('frame').map(item => (
                        <Button
                          key={item.id}
                          variant={tempProfile.frameBorder === item.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTempProfile(prev => ({ ...prev, frameBorder: item.value }))}
                          className="text-xs"
                        >
                          {item.icon} {item.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shop" className="space-y-4">
                <div className="space-y-6 max-h-80 overflow-y-auto pr-2">
                  <ShopCategorySection category="frame" title={categoryNames.frame} />
                  <ShopCategorySection category="color" title={categoryNames.color} />
                  <ShopCategorySection category="background" title={categoryNames.background} />
                  <ShopCategorySection category="avatar" title={categoryNames.avatar} />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleSaveChanges}>
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

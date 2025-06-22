
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
import { ShopItem } from '@/types/profile';
import { Edit, User, Frame, Palette, Image, UserCircle } from 'lucide-react';

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

  const getMissingRequirements = (item: ShopItem) => {
    let missing = [];
    
    if (gameState.coins < item.price) {
      missing.push(`${item.price - gameState.coins} moedas`);
    }
    
    if (item.xpRequired && gameState.totalXp < item.xpRequired) {
      missing.push(`${item.xpRequired - gameState.totalXp} XP`);
    }
    
    if (item.achievementRequired && !achievements.find(a => a.id === item.achievementRequired)?.unlocked) {
      missing.push(`conquista "${achievements.find(a => a.id === item.achievementRequired)?.title}"`);
    }
    
    return missing;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'epic': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'rare': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getItemCardBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'epic': return 'border-purple-500/30 bg-purple-500/5';
      case 'rare': return 'border-blue-500/30 bg-blue-500/5';
      default: return 'border-gray-700 bg-gray-900/30';
    }
  };

  const ShopCategoryContent = ({ category }: { category: string }) => {
    const items = getShopItemsByCategory(category);
    
    if (items.length === 0) {
      return (
        <div className="text-center py-8 text-gray-400">
          Nenhum item disponível nesta categoria
        </div>
      );
    }

    const categoryName = {
      'frame': 'Molduras',
      'color': 'Nomes', 
      'background': 'Fundos',
      'avatar': 'Avatares'
    }[category] || category;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          {category === 'frame' && <Frame className="h-5 w-5 text-white" />}
          {category === 'color' && <Palette className="h-5 w-5 text-white" />}
          {category === 'background' && <Image className="h-5 w-5 text-white" />}
          {category === 'avatar' && <UserCircle className="h-5 w-5 text-white" />}
          <h3 className="text-xl font-semibold text-white">
            {categoryName}
          </h3>
          <Badge variant="outline" className="text-xs bg-gray-800 text-gray-300 border-gray-600">
            {items.length} itens
          </Badge>
        </div>
        
        <div className="space-y-3">
          {items.map(item => {
            const canBuy = canBuyItem(item);
            const missingReqs = getMissingRequirements(item);
            
            return (
              <Card key={item.id} className={`p-4 ${getItemCardBorder(item.rarity)} border-2`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-white text-lg">{item.name}</h4>
                        <Badge className={`text-xs px-2 py-1 border ${getRarityColor(item.rarity)}`}>
                          {item.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-yellow-400">
                          {item.price} 💰
                        </span>
                        {item.xpRequired && (
                          <span className="flex items-center gap-1 text-blue-400">
                            {item.xpRequired.toLocaleString()} XP
                          </span>
                        )}
                        {item.achievementRequired && (
                          <span className="flex items-center gap-1 text-purple-400">
                            "{achievements.find(a => a.id === item.achievementRequired)?.title}" 🏆
                          </span>
                        )}
                      </div>
                      {missingReqs.length > 0 && (
                        <div className="text-xs text-red-400 mt-2">
                          Faltam: {missingReqs.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleBuyItem(item)}
                    disabled={!canBuy}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
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
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden bg-gray-950 border-gray-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-white">
            <User className="h-6 w-6" />
            Perfil Personalizável
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          {/* Preview Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Pré-visualização</h3>
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <div className={`relative p-6 rounded-lg ${tempProfile.backgroundColor} ${tempProfile.frameBorder}`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl">
                    {tempProfile.avatar}
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold ${tempProfile.nameColor}`}>
                      {tempProfile.displayName || 'Aventureiro'}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Nível {gameState.level} • {gameState.coins} moedas • {gameState.totalXp.toLocaleString()} XP
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="basic" className="w-full h-full">
              <div className="mb-6">
                <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 border-gray-700 p-1">
                  <TabsTrigger 
                    value="basic" 
                    className="text-white data-[state=active]:bg-gray-800 data-[state=active]:text-white flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Básico
                  </TabsTrigger>
                  <TabsTrigger 
                    value="shop"
                    className="text-white data-[state=active]:bg-gray-800 data-[state=active]:text-white flex items-center gap-2"
                  >
                    Loja
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="basic" className="space-y-6">
                <Card className="p-6 bg-gray-900/50 border-gray-800 space-y-6">
                  <h4 className="font-semibold text-white text-lg">Configurações Básicas</h4>
                  
                  <div>
                    <Label htmlFor="displayName" className="text-white">Nome de Exibição</Label>
                    <Input
                      id="displayName"
                      value={tempProfile.displayName}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, displayName: e.target.value }))}
                      placeholder="Digite seu nome"
                      className="bg-gray-800 border-gray-700 text-white mt-2"
                    />
                  </div>

                  <div>
                    <Label className="text-white">Itens Possuídos</Label>
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      {getOwnedItems('avatar').map(item => (
                        <Button
                          key={item.id}
                          variant={tempProfile.avatar === item.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTempProfile(prev => ({ ...prev, avatar: item.value }))}
                          className="text-sm p-3"
                        >
                          {item.value}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={onClose} className="border-gray-600 text-white">
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveChanges} className="bg-purple-600 hover:bg-purple-700">
                      Salvar Alterações
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="shop">
                <div className="space-y-4">
                  <Tabs defaultValue="frame" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border-gray-700 mb-6">
                      <TabsTrigger 
                        value="frame" 
                        className="text-white data-[state=active]:bg-gray-800 data-[state=active]:text-white flex items-center gap-2"
                      >
                        <Frame className="h-4 w-4" />
                        Molduras
                      </TabsTrigger>
                      <TabsTrigger 
                        value="color"
                        className="text-white data-[state=active]:bg-gray-800 data-[state=active]:text-white flex items-center gap-2"
                      >
                        <Palette className="h-4 w-4" />
                        Nomes
                      </TabsTrigger>
                      <TabsTrigger 
                        value="background"
                        className="text-white data-[state=active]:bg-gray-800 data-[state=active]:text-white flex items-center gap-2"
                      >
                        <Image className="h-4 w-4" />
                        Fundos
                      </TabsTrigger>
                      <TabsTrigger 
                        value="avatar"
                        className="text-white data-[state=active]:bg-gray-800 data-[state=active]:text-white flex items-center gap-2"
                      >
                        <UserCircle className="h-4 w-4" />
                        Avatares
                      </TabsTrigger>
                    </TabsList>

                    <div className="overflow-y-auto max-h-[500px] pr-2">
                      <TabsContent value="frame">
                        <ShopCategoryContent category="frame" />
                      </TabsContent>

                      <TabsContent value="color">
                        <ShopCategoryContent category="color" />
                      </TabsContent>

                      <TabsContent value="background">
                        <ShopCategoryContent category="background" />
                      </TabsContent>

                      <TabsContent value="avatar">
                        <ShopCategoryContent category="avatar" />
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

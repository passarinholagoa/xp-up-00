
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Lock, X } from 'lucide-react';
import { Achievement, ACHIEVEMENT_CATEGORIES } from '@/types/achievements';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsModal = ({ isOpen, onClose, achievements }: AchievementsModalProps) => {
  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto quest-card">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Trophy className="h-6 w-6 text-quest-legendary" />
              Conquistas
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mt-2">
            <Badge variant="secondary" className="text-sm">
              {unlockedCount}/{totalCount} Desbloqueadas
            </Badge>
            <div className="flex-1">
              <Progress 
                value={(unlockedCount / totalCount) * 100} 
                className="h-2"
              />
            </div>
            <span className="text-sm text-muted-foreground">
              {Math.round((unlockedCount / totalCount) * 100)}%
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => {
            const categoryInfo = ACHIEVEMENT_CATEGORIES[category as keyof typeof ACHIEVEMENT_CATEGORIES];
            const unlockedInCategory = categoryAchievements.filter(a => a.unlocked).length;
            
            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{categoryInfo.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {unlockedInCategory}/{categoryAchievements.length}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryAchievements.map((achievement) => (
                    <Card 
                      key={achievement.id}
                      className={`p-4 transition-all duration-200 ${
                        achievement.unlocked 
                          ? `${categoryInfo.color} glow-effect` 
                          : 'bg-muted/20 opacity-75'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`text-2xl transition-all duration-200 ${
                          achievement.unlocked ? 'scale-110' : 'grayscale opacity-50'
                        }`}>
                          {achievement.unlocked ? achievement.icon : <Lock className="h-6 w-6" />}
                        </div>
                        
                        <div className="flex-1 space-y-1">
                          <h4 className={`font-medium ${
                            achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {achievement.title}
                          </h4>
                          
                          <p className="text-xs text-muted-foreground">
                            {achievement.description}
                          </p>
                          
                          {achievement.maxProgress && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Progresso</span>
                                <span>{achievement.progress || 0}/{achievement.maxProgress}</span>
                              </div>
                              <Progress 
                                value={((achievement.progress || 0) / achievement.maxProgress) * 100} 
                                className="h-1"
                              />
                            </div>
                          )}
                          
                          {achievement.unlocked && achievement.unlockedAt && (
                            <p className="text-xs text-quest-legendary">
                              Desbloqueado em {achievement.unlockedAt.toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

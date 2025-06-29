
import React from 'react';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HabitsList } from './tasks/HabitsList';
import { DailiesList } from './tasks/DailiesList';
import { TodosList } from './tasks/TodosList';
import { useGame } from '@/contexts/GameContext';
import { useIsMobile } from '@/hooks/use-mobile';

export const TaskDashboard = () => {
  const { createNewQuest } = useGame();
  const isMobile = useIsMobile();

  return (
    <Card className={`bg-card/50 backdrop-blur-sm border-border ${isMobile ? 'p-3' : 'p-4 sm:p-6'}`}>
      <div className={isMobile ? 'space-y-3' : 'space-y-4 sm:space-y-6'}>
        <div className={`flex items-start justify-between ${isMobile ? 'flex-col gap-3' : 'flex-col sm:flex-row gap-4'}`}>
          <div>
            <h2 className={`font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent ${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>
              Suas Aventuras
            </h2>
            <p className={`text-muted-foreground mt-1 ${isMobile ? 'text-sm' : 'text-sm sm:text-base'}`}>
              Gerencie suas tarefas e conquiste seus objetivos
            </p>
          </div>
          <Button
            onClick={createNewQuest}
            size={isMobile ? "default" : "lg"}
            className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 w-full sm:w-auto ${
              isMobile 
                ? 'gap-2 px-4 py-2 text-sm font-semibold' 
                : 'gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold'
            }`}
          >
            <Plus className={isMobile ? 'h-4 w-4' : 'h-4 w-4 sm:h-5 sm:w-5'} />
            Nova Quest
          </Button>
        </div>
        
        <Tabs defaultValue="habits" className="w-full">
          <TabsList className={`grid w-full grid-cols-3 bg-secondary/30 ${isMobile ? 'h-9' : 'h-10 sm:h-12'}`}>
            <TabsTrigger 
              value="habits" 
              className={`data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium ${isMobile ? 'text-xs' : 'text-xs sm:text-sm'}`}
            >
              Hábitos
            </TabsTrigger>
            <TabsTrigger 
              value="dailies" 
              className={`data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium ${isMobile ? 'text-xs' : 'text-xs sm:text-sm'}`}
            >
              Dailies
            </TabsTrigger>
            <TabsTrigger 
              value="todos" 
              className={`data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium ${isMobile ? 'text-xs' : 'text-xs sm:text-sm'}`}
            >
              To-Dos
            </TabsTrigger>
          </TabsList>
          
          <div className={isMobile ? 'mt-3' : 'mt-4 sm:mt-6'}>
            <TabsContent value="habits" className="space-y-4 mt-0">
              <HabitsList />
            </TabsContent>
            
            <TabsContent value="dailies" className="space-y-4 mt-0">
              <DailiesList />
            </TabsContent>
            
            <TabsContent value="todos" className="space-y-4 mt-0">
              <TodosList />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Card>
  );
};

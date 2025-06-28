
import React from 'react';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { HabitsList } from './tasks/HabitsList';
import { DailiesList } from './tasks/DailiesList';
import { TodosList } from './tasks/TodosList';
import { useGame } from '@/contexts/GameContext';

export const TaskDashboard = () => {
  const { createNewQuest } = useGame();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Suas Aventuras</h2>
        <Button
          onClick={createNewQuest}
          className="bg-quest-gradient hover:opacity-90 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nova Quest
        </Button>
      </div>
      
      <Tabs defaultValue="habits" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
          <TabsTrigger value="habits" className="data-[state=active]:bg-primary">
            Hábitos
          </TabsTrigger>
          <TabsTrigger value="dailies" className="data-[state=active]:bg-primary">
            Dailies
          </TabsTrigger>
          <TabsTrigger value="todos" className="data-[state=active]:bg-primary">
            To-Dos
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="habits" className="space-y-4">
          <HabitsList />
        </TabsContent>
        
        <TabsContent value="dailies" className="space-y-4">
          <DailiesList />
        </TabsContent>
        
        <TabsContent value="todos" className="space-y-4">
          <TodosList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

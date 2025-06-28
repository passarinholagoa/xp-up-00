
import React from 'react';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HabitsList } from './tasks/HabitsList';
import { DailiesList } from './tasks/DailiesList';
import { TodosList } from './tasks/TodosList';
import { useGame } from '@/contexts/GameContext';

export const TaskDashboard = () => {
  const { createNewQuest } = useGame();

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Suas Aventuras
            </h2>
            <p className="text-muted-foreground mt-1">
              Gerencie suas tarefas e conquiste seus objetivos
            </p>
          </div>
          <Button
            onClick={createNewQuest}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center gap-3 px-6 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            Nova Quest
          </Button>
        </div>
        
        <Tabs defaultValue="habits" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/30 h-12">
            <TabsTrigger value="habits" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">
              Hábitos
            </TabsTrigger>
            <TabsTrigger value="dailies" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">
              Dailies
            </TabsTrigger>
            <TabsTrigger value="todos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">
              To-Dos
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
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

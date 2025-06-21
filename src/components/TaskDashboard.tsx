
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HabitsList } from './tasks/HabitsList';
import { DailiesList } from './tasks/DailiesList';
import { TodosList } from './tasks/TodosList';

export const TaskDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Suas Aventuras</h2>
      
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

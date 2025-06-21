
import React from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { StatsPanel } from '../components/StatsPanel';
import { TaskDashboard } from '../components/TaskDashboard';
import { QuickActions } from '../components/QuickActions';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <HeroSection />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-3 space-y-6">
            <StatsPanel />
            <TaskDashboard />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;


import React from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { StatsPanel } from '../components/StatsPanel';
import { TaskDashboard } from '../components/TaskDashboard';
import { QuickActions } from '../components/QuickActions';
import { NewQuestModal } from '../components/NewQuestModal';
import { AchievementsModal } from '../components/AchievementsModal';
import { useGame } from '../contexts/GameContext';
import { ProfileModal } from '../components/ProfileModal';
import { SettingsModal } from '../components/SettingsModal';
import { useTheme } from '../hooks/useTheme';

const Index = () => {
  const { 
    isNewQuestModalOpen, 
    closeNewQuestModal,
    isAchievementsModalOpen,
    closeAchievements,
    isProfileModalOpen,
    closeProfile,
    isSettingsModalOpen,
    closeSettings,
    achievements
  } = useGame();

  // Aplicar o tema
  useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
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

      <NewQuestModal 
        isOpen={isNewQuestModalOpen} 
        onClose={closeNewQuestModal} 
      />

      <AchievementsModal
        isOpen={isAchievementsModalOpen}
        onClose={closeAchievements}
        achievements={achievements}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfile}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={closeSettings}
      />
    </div>
  );
};

export default Index;

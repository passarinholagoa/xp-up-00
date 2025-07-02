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
import { useIsMobile } from '../hooks/use-mobile';

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

  const isMobile = useIsMobile();
  
  // Aplicar o tema
  useTheme();

  return (
    <div className="min-h-screen bg-background w-full transition-colors duration-300">
      <Header />
      
      <main className={`w-full px-1.5 sm:px-4 py-3 sm:py-4 ${isMobile ? '' : 'container mx-auto max-w-7xl'}`}>
        {/* Hero Section */}
        <div className={isMobile ? 'mb-2' : 'mb-6 sm:mb-8'}>
          <HeroSection />
        </div>
        
        {/* Stats Section */}
        <div className={isMobile ? 'mb-2' : 'mb-6 sm:mb-8'}>
          <StatsPanel />
        </div>
        
        {/* Main Content Grid */}
        <div className={`grid grid-cols-1 xl:grid-cols-4 w-full ${isMobile ? 'gap-1.5' : 'gap-4 sm:gap-8'}`}>
          {/* Main content area - Tasks */}
          <div className="xl:col-span-3">
            <TaskDashboard />
          </div>
          
          {/* Sidebar - Quick Actions */}
          <div className="xl:col-span-1">
            <div className="xl:sticky xl:top-6">
              <QuickActions />
            </div>
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

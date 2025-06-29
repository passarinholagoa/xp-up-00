
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
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      
      <main className={`container mx-auto py-4 max-w-7xl ${isMobile ? 'px-2' : 'px-3 sm:px-4'}`}>
        {/* Hero Section */}
        <div className={isMobile ? 'mb-4' : 'mb-6 sm:mb-8'}>
          <HeroSection />
        </div>
        
        {/* Stats Section */}
        <div className={isMobile ? 'mb-4' : 'mb-6 sm:mb-8'}>
          <StatsPanel />
        </div>
        
        {/* Main Content Grid */}
        <div className={`grid grid-cols-1 xl:grid-cols-4 ${isMobile ? 'gap-3' : 'gap-4 sm:gap-8'}`}>
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

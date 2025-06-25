
import React from 'react';
import { Header } from '@/components/Header';
import { StatsPanel } from '@/components/StatsPanel';
import { TaskDashboard } from '@/components/TaskDashboard';
import { QuickActions } from '@/components/QuickActions';
import { NewQuestModal } from '@/components/NewQuestModal';
import { AchievementsModal } from '@/components/AchievementsModal';
import { ProfileModal } from '@/components/ProfileModal';
import { SettingsModal } from '@/components/SettingsModal';
import { useGame } from '@/contexts/GameContext';

const Index = () => {
  const { isNewQuestModalOpen, closeNewQuestModal, isAchievementsModalOpen, closeAchievements, isProfileModalOpen, closeProfile, isSettingsModalOpen, closeSettings } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Stats */}
          <div className="lg:col-span-1">
            <StatsPanel />
          </div>
          
          {/* Middle Column - Tasks */}
          <div className="lg:col-span-2">
            <Header />
            <TaskDashboard />
          </div>
          
          {/* Right Column - Actions */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>
      </div>

      {/* Modals */}
      <NewQuestModal isOpen={isNewQuestModalOpen} onClose={closeNewQuestModal} />
      <AchievementsModal isOpen={isAchievementsModalOpen} onClose={closeAchievements} />
      <ProfileModal isOpen={isProfileModalOpen} onClose={closeProfile} />
      <SettingsModal isOpen={isSettingsModalOpen} onClose={closeSettings} />
    </div>
  );
};

export default Index;

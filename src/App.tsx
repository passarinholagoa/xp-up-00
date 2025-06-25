
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { GameProvider } from '@/contexts/GameContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { NewQuestModal } from '@/components/NewQuestModal';
import { AchievementsModal } from '@/components/AchievementsModal';
import { ProfileModal } from '@/components/ProfileModal';
import { SettingsModal } from '@/components/SettingsModal';
import { useGame } from '@/contexts/GameContext';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import './App.css';

const AppContent = () => {
  const { 
    isNewQuestModalOpen, 
    closeNewQuestModal,
    isAchievementsModalOpen,
    closeAchievements,
    isProfileModalOpen,
    closeProfile,
    isSettingsModalOpen,
    closeSettings
  } = useGame();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      
      <NewQuestModal 
        isOpen={isNewQuestModalOpen} 
        onClose={closeNewQuestModal} 
      />
      
      <AchievementsModal 
        isOpen={isAchievementsModalOpen} 
        onClose={closeAchievements} 
      />
      
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={closeProfile} 
      />

      <SettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={closeSettings} 
      />
      
      <Toaster />
    </>
  );
};

function App() {
  return (
    <SettingsProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </SettingsProvider>
  );
}

export default App;

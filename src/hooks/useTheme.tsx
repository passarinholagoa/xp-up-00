
import { useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';

export const useTheme = () => {
  const { settings } = useGame();

  useEffect(() => {
    const root = document.documentElement;
    
    if (settings.darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [settings.darkMode]);

  return {
    isDark: settings.darkMode,
    theme: settings.darkMode ? 'dark' : 'light'
  };
};

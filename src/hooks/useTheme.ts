
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('webfokus-theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    switchTheme(defaultTheme);
  };

  const switchTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('webfokus-theme', newTheme);
  };

  const toggleTheme = () => {
    switchTheme(theme === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    switchTheme,
    toggleTheme,
    initializeTheme
  };
};

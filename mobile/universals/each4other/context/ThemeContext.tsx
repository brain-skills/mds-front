// context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextProps {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        setIsDark(storedTheme === 'dark');
      } catch (e) {
        setIsDark(false);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = () => {
    setIsDark(prevIsDark => {
      const newIsDark = !prevIsDark;
      AsyncStorage.setItem('theme', newIsDark ? 'dark' : 'light').catch(console.error);
      return newIsDark;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: isDark ? DarkTheme : DefaultTheme,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeContext must be used within a ThemeProvider');
  return context;
};

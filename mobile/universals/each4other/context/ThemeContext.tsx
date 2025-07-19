import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { Appearance } from 'react-native';

interface ThemeContextValue {
  theme: Theme;
  mode: 'light' | 'dark' | 'system';
  setMode: (mode: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DefaultTheme,
  mode: 'light',
  setMode: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark' | 'system'>('system');
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme() || 'light');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme || 'light');
    });
    return () => subscription.remove();
  }, []);

  const theme = (() => {
    if (mode === 'system') {
      return colorScheme === 'dark' ? DarkTheme : DefaultTheme;
    }
    return mode === 'dark' ? DarkTheme : DefaultTheme;
  })();

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

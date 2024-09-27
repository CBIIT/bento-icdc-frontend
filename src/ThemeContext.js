import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import themes, { overrides, typography } from './themes';

const lightTheme = createTheme({ ...themes.light, ...overrides, ...typography });
const darkTheme = createTheme({ ...themes.dark, ...overrides, ...typography });

const defaultContextData = {
  dark: false,
  toggleTheme: () => {},
};

const ThemeContext = React.createContext(defaultContextData);
const useTheme = () => React.useContext(ThemeContext);

const useEffectDarkMode = () => {
  const [themeState, setThemeState] = React.useState({
    dark: false,
    hasThemeMounted: false,
  });
  React.useEffect(() => {
    const lsDark = localStorage.getItem('dark') === 'true';
    setThemeState({ ...themeState, dark: lsDark, hasThemeMounted: true });
  }, []);

  return [themeState, setThemeState];
};

const CustomThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useEffectDarkMode();

  const toggleTheme = () => {
    const dark = !themeState.dark;
    localStorage.setItem('dark', JSON.stringify(dark));
    setThemeState({ ...themeState, dark });
  };

  const computedTheme = themeState.dark ? darkTheme : lightTheme;
  console.log('theme-state', themeState);

  return (
    <ThemeProvider theme={computedTheme}>
      <ThemeContext.Provider
        value={{
          dark: themeState.dark,
          toggleTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

export { CustomThemeProvider, useTheme };

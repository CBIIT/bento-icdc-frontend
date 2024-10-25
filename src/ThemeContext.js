import React from 'react';
import { StylesProvider, ThemeProvider as ThemeProviderV4, createTheme as createThemeV4 } from '@material-ui/core/styles';
import { adaptV4Theme, createTheme as createThemeV5, StyledEngineProvider, ThemeProvider as ThemeProviderV5 } from '@mui/material'
import themes, { overrides, typography } from './themes';
import { generateClassName } from './utils/mui-config';

const lightThemeV4 = createThemeV4({ ...themes.light, ...overrides, ...typography });
const darkThemeV4 = createThemeV4({ ...themes.dark, ...overrides, ...typography });

const lightThemeV5 = createThemeV5(adaptV4Theme({ ...themes.light, ...overrides, ...typography }));
const darkThemeV5 = createThemeV5(adaptV4Theme({ ...themes.dark, ...overrides, ...typography }));

const defaultContextData = {
    dark: false,
    toggleTheme: () => { },
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

    const computedThemeV4 = themeState.dark ? darkThemeV4 : lightThemeV4;
    const computedThemeV5 = themeState.dark ? darkThemeV5 : lightThemeV5;

    return (
        <StylesProvider generateClassName={generateClassName}>
            <StyledEngineProvider injectFirst>
                <ThemeProviderV4 theme={computedThemeV4}>
                    <ThemeProviderV5 theme={computedThemeV5}>
                        <ThemeContext.Provider
                            value={{
                                dark: themeState.dark,
                                toggleTheme,
                            }}
                        >
                            {children}
                        </ThemeContext.Provider>
                    </ThemeProviderV5>
                </ThemeProviderV4>
            </StyledEngineProvider>
        </StylesProvider>
    );
};

export { CustomThemeProvider, useTheme };

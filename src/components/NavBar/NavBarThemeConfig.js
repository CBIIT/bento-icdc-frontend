import React from 'react';
// import { adaptV4Theme } from '@mui/material/styles';
import {
    MuiThemeProvider,
} from '@material-ui/core/styles';
import {
    // ThemeProvider as MuiThemeProvider, // use this after bento-frontend has been migrated to v5
    StyledEngineProvider,
    createTheme
} from '@mui/material';
import themes, { overrides } from '../../themes';

export default ({
    children,
}) => {
    const style = [];
    const overridesObj = themes.light.overrides;
    const MuiButton = {
        root: {
            '&#button_navbar_mycases': {
                marginRight: '-16px',
            },
        },
    };

    const MuiAppBar = {
        positionFixed: {
            position: 'relative',
        },
    };

    overridesObj.MuiButton = MuiButton;
    overridesObj.MuiAppBar = MuiAppBar;

    style.push(overridesObj);
    const computedTheme = createTheme({ ...themes.light, ...overrides, ...style });

    return (
        <StyledEngineProvider injectFirst>
            <MuiThemeProvider theme={computedTheme}>
                {children}
            </MuiThemeProvider>
        </StyledEngineProvider>
    );
};

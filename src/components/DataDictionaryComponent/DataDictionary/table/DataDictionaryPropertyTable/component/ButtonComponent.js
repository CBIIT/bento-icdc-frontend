import React from 'react';
import {
  Button,
  createTheme,
  MuiThemeProvider,
} from '@material-ui/core';

const theme = {
  overrides: {
    MuiButton: {
      root: {
        fontSize: '15px',
        textTransform: 'none',
        color: '#0d71a3',
        float: 'right',
        background: 'none',
        marginTop: '-20px',
        marginRight: '20px',
        '&:hover': {
          backgroundColor: 'transparent',
          cursor: 'pointer',
        },
      },
    },
  },
};

const ButtonComponent = ({
  label,
  openHandler,
  disableTouchRipple,
}) => (
  <MuiThemeProvider theme={createTheme(theme)}>
    <Button
      onClick={openHandler}
      disableTouchRipple={disableTouchRipple}
    >
      {label}
    </Button>
  </MuiThemeProvider>
);

ButtonComponent.defaultProps = {
  disableTouchRipple: true,
};

export default ButtonComponent;

import React from 'react';
// import { adaptV4Theme } from '@mui/material/styles';
import {
    MuiThemeProvider,
    // createTheme 
} from '@material-ui/core/styles';
import {
    // ThemeProvider as MuiThemeProvider, // use this after bento-frontend has been migrated to v5,
    IconButton,
    Icon,
    StyledEngineProvider,
    createTheme
} from '@mui/material';
import deleteIcon from '../../assets/deleteIcon.svg';

const theme = {
  overrides: {
    MuiIconButton: {
      root: {
        padding: '0',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '& span': {
          display: 'contents',
        },
        '& img': {
          width: '32px',
          height: '45px',
        },
      },
    },
    MuiIcon: {
      root: {
        width: '1.2em',
        height: '1.2em',
      },
    },
  },
};

const DeleteButton = ({
  row,
  onDeleteRow,
  deleteCartFile,
}) => {
  const delIcon = (
    <Icon>
      <img alt="delete" src={deleteIcon} />
    </Icon>
  );
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={createTheme(theme)}>
        <IconButton
          disableRipple
          disableElevation
          disableFocusRipple
          onClick={() => deleteCartFile(row, onDeleteRow)}
          aria-label='delete'
          size="large">
          {delIcon}
        </IconButton>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

export default DeleteButton;

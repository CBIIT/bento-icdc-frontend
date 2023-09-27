import React from 'react';
import {
  IconButton,
  Icon,
  ThemeProvider,
  createTheme,
} from '@material-ui/core';
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
    <ThemeProvider theme={createTheme(theme)}>
      <IconButton
        disableRipple
        disableElevation
        disableFocusRipple
        onClick={() => deleteCartFile(row, onDeleteRow)}
      >
        {delIcon}
      </IconButton>
    </ThemeProvider>
  );
};

export default DeleteButton;

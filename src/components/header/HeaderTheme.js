import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import vectorIcon from '../../assets/header/Vector.svg';

const HeaderThemeProvider = ({ children }) => {
  const computedTheme = createTheme({
    overrides: {
      MuiInputBase: {
        root: {
          fontFamily: 'Open Sans',
          fontSize: '13.5px',
          color: '#25557E',
          fontWeight: 400,
          padding: '0px',
          fontStyle: '1rem',
          lineHeight: '16px',
          texttransform: 'uppercase',
        },
        input: {
          fontSize: '1rem',
        },
      },
      MuiOutlinedInput: {
        root: {
          border: '#4A8ECB solid 1px',
          borderRadius: '8px',
        },
        notchedOutline: {
          border: 'none',
        },
      },
      MuiAutocomplete: {
        paper: {
          borderRadius: '8px',
        },
        option: {
          '&:hover': {
            color: '#FFF',
            backgroundColor: '#1C75BC',
          },
        },
        listbox: {
          borderRadius: '8px',
          fontFamily: 'Open Sans',
          fontSize: '13.5px',
          color: '#0B3556',
          fontWeight: 400,
          border: '1px solid #4A8ECB',
          padding: '0px',
          fontStyle: 'normal',
          lineHeight: '26px',
          texttransform: 'uppercase',
          '& li': {
            // list item specific styling
            padding: '3px, 14px, 4px, 14px',
            borderBottom: '1px solid #4A8ECB',
            '&:nth-last-child(1)': {
              borderBottom: 'none',
              fontSize: '16px',
              color: '#000000',
              backgroundColor: '#E9E9E9',
              '& :hover': {
                color: '#000000',
                backgroundColor: '#E9E9E9',
                pointerEvents: 'none',
              },
              '& span': {
                backgroundImage: `url(${vectorIcon})`,
                width: '165px',
                marginTop: '5px',
                float: 'right',
                height: '15px',
                display: 'block',
                backgroundRepeat: 'no-repeat',
                '& img': {
                  display: 'none',
                },
              },
            },
          },
        },
      },
    },
  });

  return <MuiThemeProvider theme={computedTheme}>{children}</MuiThemeProvider>;
};

export default HeaderThemeProvider;

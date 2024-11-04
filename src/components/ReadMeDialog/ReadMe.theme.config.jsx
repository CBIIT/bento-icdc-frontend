import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ReadMeThemeConfig = ({ children }) => {
  const themeV4 = {
    overrides: {
      MuiDialog: {
        paper: {
          borderRadius: "5px",
          padding: "0px 0px 0px 20px",
          boxShadow: "none",
          overflowX: "hidden",
          overflowY: "hidden",
        },
        paperScrollPaper: {
          maxHeight: "650px",
        },
        paperWidthMd: {
          minWidth: "750px",
        },
      },
      MuiDialogContent: {
        root: {
          padding: "15px 25px 35px 15px",
        },
      },
      MuiBackdrop: {
        root: {
          backgroundColor: "#4a4a4a52",
        },
      },
      MuiButton: {
        root: {
          minWidth: "24px",
        },
        startIcon: {
          marginRight: "0",
          marginLeft: "0",
        },
      },
      MuiIconButton: {
        root: {
          marginRight: "10px",
          textTransform: "none",
          padding: "none",
          "&:hover": {
            backgroundColor: "transparent",
            cursor: "pointer",
          },
        },
      },
      MuiSvgIcon: {
        root: {
          color: "#0d71a3",
        },
      },
    },
  };

  const theme = {
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            maxWidth: "960px",
            maxHeight: "650px",
            borderRadius: "5px",
            padding: "0px 0px 0px 20px",
            boxShadow: "none",
            overflowX: "hidden",
            overflowY: "hidden",
          },
          paperScrollPaper: {
            maxHeight: "650px",
          },
          paperWidthMd: {
            minWidth: "750px",
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: "#4a4a4a52",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#0d71a3",
          }
        },
      },
    },
  };

  const computedTheme = createTheme(theme);
  return <ThemeProvider theme={computedTheme}>{children}</ThemeProvider>;
};

export default ReadMeThemeConfig;

import React from "react";
import { 
  createTheme, 
  ThemeProvider
} from '@mui/material/styles';

const DashboardThemeProvider = ({children}) => {
  const theme = {
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            "&#jbrowse_multi_view_button": {
              padding: "0px",
              color: "#ffffff",
              height: "43px",
              marginLeft: "22px",
              textTransform: "inherit",
              "& img": {
                width: "2.25em",
              },
            },
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={createTheme(theme)}>
      {children}
    </ThemeProvider>
  );
}

export default DashboardThemeProvider;

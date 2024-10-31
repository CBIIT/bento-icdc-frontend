import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/LayoutView";
import { CustomThemeProvider } from "./ThemeContext";

console.log('process', process.env);

const App = () => {
  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CustomThemeProvider>
  );
};

export default App;

import React from "react";
import { themeSettings } from "@/theme";
import { CssBaseline, ThemeProvider as Theme } from "@mui/material";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { ChildrenType } from "@/types/index.types";

const ThemeProvider = ({ children }: ChildrenType) => {
  const mode = useSelector((state: any) => state.global.mode);
  const theme = createTheme(themeSettings(mode) as ThemeOptions);
  return (
    <Theme theme={theme}>
      <CssBaseline />
      {children}
    </Theme>
  );
};

export default ThemeProvider;

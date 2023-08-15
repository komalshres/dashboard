import { themeSettings } from "@/theme";
import { useTheme as Theme } from "@mui/material";
import React from "react";

const useTheme = () => {
  const theme = Theme<ReturnType<typeof themeSettings>>();

  return { theme };
};

export default useTheme;

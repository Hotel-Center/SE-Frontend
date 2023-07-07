// primary: #f59f0b

import { createTheme } from "@mui/material/styles";

const lightThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#f59e0b",
    },
    secondary: {
      main: "#dc2626",
    },
  },
  contrastThreshold: 4.5,
};

const darkThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#f59e0b",
    },
    secondary: {
      main: "#dc2626",
    },
  },
  contrastThreshold: 4.5,
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);

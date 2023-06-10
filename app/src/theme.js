import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#d6d6d6",
      main: "#2c2b30",
      dark: "#181818",
      contrastText: "#f8f4f4",
    },
    secondary: {
      light: "#f8f4f4",
      main: "#f58f7c",
    },
    dark_button: {
      light: "#d6d6d6",
      main: "#181818",
      dark: "#2c2b30",
      contrastText: "#f58f7c",
    },
    light_button: {
      main: "#f58f7c",
    },
  },
});

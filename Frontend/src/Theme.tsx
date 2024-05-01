import { createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#358256", // Adjust primary color
    },
    secondary: {
      main: "#94DDC7", // Adjust secondary color
    },
    error: {
      main: "#9AC6A4", // Adjust error color
    },
    warning: {
      main: "#9AC6A4", // Adjust warning color
    },
    info: {
      main: "#358256", // Adjust info color
    },
    success: {
      main: "#358256", // Adjust success color
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Adjust default font family
  },
});
export default theme;

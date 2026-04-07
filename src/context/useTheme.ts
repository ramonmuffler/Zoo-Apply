import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useTheme muss innerhalb von ThemeProvider verwendet werden",
    );
  }
  return context;
};

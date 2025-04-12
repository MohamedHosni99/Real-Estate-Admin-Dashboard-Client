import React, { type PropsWithChildren, createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { LightTheme } from "@refinedev/mui"; // Only using LightTheme

type ColorModeContextType = {
  mode: string; // Just keep the mode to light
  setMode: () => void; // This is removed as you no longer need to toggle the mode
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType,
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // Force the theme to light mode
  const [mode] = useState("light"); // Always use light mode

  // Ensure colorMode is saved in localStorage if needed
  useEffect(() => {
    window.localStorage.setItem("colorMode", "light"); // Always set to light mode
  }, []);

  // No need to toggle mode anymore, so remove setColorMode
  return (
    <ColorModeContext.Provider
      value={{
        setMode: () => {}, // No-op function since we're not toggling anymore
        mode,
      }}
    >
      <ThemeProvider theme={LightTheme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

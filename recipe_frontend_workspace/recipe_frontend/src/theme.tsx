import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export const COLORS = {
  primary: "#FF7043",
  secondary: "#81C784",
  accent: "#FFD600",
  background: "#fff",
  surface: "#FAFAFA",
  text: "#333",
  textSecondary: "#666",
  border: "#E0E0E0",
};

type Theme = {
  colors: typeof COLORS;
  mode: "light";
};

const ThemeContext = createContext<Theme>({ colors: COLORS, mode: "light" });

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Only light mode in MVP, but structure for easy dark mode extension.
  const [theme] = useState<Theme>({ colors: COLORS, mode: "light" });

  const contextValue = useMemo(() => theme, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

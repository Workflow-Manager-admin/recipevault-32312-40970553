import React from "react";
import { useTheme } from "../theme";

// PUBLIC_INTERFACE
export const NavBar: React.FC<{
  onDrawerToggle: () => void;
}> = ({ onDrawerToggle }) => {
  const { colors } = useTheme();

  return (
    <nav
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        padding: "0 1.2rem",
        background: colors.primary,
        color: "white",
        borderBottom: `1px solid ${colors.border}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <button
        onClick={onDrawerToggle}
        aria-label="Open side drawer"
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: 24,
          cursor: "pointer",
          marginRight: 16,
          lineHeight: 1,
        }}
      >
        &#9776;
      </button>
      <div style={{
        fontWeight: 700,
        letterSpacing: 1,
        fontSize: "1.4rem"
      }}>
        RecipeVault
      </div>
    </nav>
  );
};

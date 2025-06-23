import React from "react";
import { useTheme } from "../theme";

// PUBLIC_INTERFACE
export const NavBar: React.FC<{
  onDrawerToggle: () => void;
}> = ({ onDrawerToggle }) => {
  const { colors } = useTheme();

  return (
    <nav
      role="navigation"
      aria-label="Top navigation bar"
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        padding: "0 1.2rem",
        background: colors.primary,
        color: "#fff",
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
          fontSize: 28,
          cursor: "pointer",
          marginRight: 18,
          lineHeight: 1,
          borderRadius: 7,
          outline: "none",
          display: "flex",
          alignItems: "center",
          transition: "color .16s"
        }}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            onDrawerToggle();
            e.stopPropagation();
          }
        }}
        onFocus={e => (e.currentTarget.style.color = colors.accent)}
        onBlur={e => (e.currentTarget.style.color = "#fff")}
      >
        &#9776;
      </button>
      <div
        style={{
          fontWeight: 900,
          letterSpacing: 2,
          fontSize: "1.6rem",
          color: "#fff",
          textShadow: "0 1px 7px rgba(255,112,67,0.065)"
        }}
        tabIndex={0}
        aria-label="RecipeVault - Home"
      >
        RecipeVault
      </div>
    </nav>
  );
};

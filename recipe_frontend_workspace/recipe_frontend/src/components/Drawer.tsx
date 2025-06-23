import React from "react";
import { useTheme } from "../theme";

// Dummy list for now
const categories = [
  { name: "All Recipes", key: "all" },
  { name: "Favorites", key: "favorites" },
  { name: "Quick & Easy", key: "quick" },
  { name: "Healthy", key: "healthy" },
];

// PUBLIC_INTERFACE
export const Drawer: React.FC<{
  open: boolean;
  onClose: () => void;
  onNavigate: (category: string) => void;
}> = ({ open, onClose, onNavigate }) => {
  const { colors } = useTheme();

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: open ? 0 : -240,
        width: 240,
        height: "100vh",
        background: colors.surface,
        color: colors.text,
        borderRight: `1px solid ${colors.border}`,
        boxShadow: open ? "2px 0 16px 0 rgba(0,0,0,0.09)" : undefined,
        transition: "left 0.25s cubic-bezier(0.4,0,0.2,1)",
        zIndex: 120,
        overflowY: "auto",
        outline: open ? "2px solid #FF7043" : "none"
      }}
      aria-label="Sidebar with recipe categories"
      tabIndex={open ? 0 : -1}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 56,
          gap: 6,
          padding: "0.75rem 0.5rem"
        }}
        role="list"
      >
        {categories.map(cat => (
          <button
            key={cat.key}
            style={{
              background: "none",
              border: "none",
              textAlign: "left",
              color: colors.text,
              padding: "10px 14px",
              borderRadius: 5,
              cursor: "pointer",
              fontWeight: 600,
              transition: "background 0.13s",
              outline: "none",
              boxShadow: "none"
            }}
            onClick={() => { onNavigate(cat.key); onClose(); }}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                onNavigate(cat.key); onClose();
              }
            }}
            tabIndex={0}
            aria-label={`Filter by ${cat.name}`}
            onFocus={e => (e.currentTarget.style.background = "#ffece5")}
            onBlur={e => (e.currentTarget.style.background = "none")}
            onMouseOver={e => (e.currentTarget.style.background = "#fff3ed")}
            onMouseOut={e => (e.currentTarget.style.background = "none")}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "none",
          border: "none",
          fontSize: 22,
          color: colors.primary,
          cursor: "pointer",
          outline: "none"
        }}
        aria-label="Close drawer"
        tabIndex={0}
        onFocus={e => (e.currentTarget.style.color = colors.secondary)}
        onBlur={e => (e.currentTarget.style.color = colors.primary)}
      >×</button>
    </aside>
  );
};

import React from "react";
import { useTheme } from "../theme";

// Dummy data for now
const demoRecipes = [
  { id: 1, title: "Classic Spaghetti Carbonara", short: "A Roman favourite.", },
  { id: 2, title: "Hearty Veg Chili", short: "Wholesome and warming." },
  { id: 3, title: "Berry Smoothie Bowl", short: "A refreshing breakfast." },
];

// PUBLIC_INTERFACE
export const RecipeList: React.FC = () => {
  const { colors } = useTheme();

  return (
    <section style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ color: colors.primary, marginBottom: 22 }}>Recipes</h2>
      <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
        {demoRecipes.map(r => (
          <li
            key={r.id}
            style={{
              background: colors.surface,
              marginBottom: 16,
              borderRadius: 7,
              boxShadow: "0 1px 7px 0 rgba(0,0,0,0.04)",
              padding: "18px 18px",
              transition: "box-shadow .18s",
              border: `1px solid ${colors.border}`,
            }}
          >
            <h3 style={{ margin: 0, fontWeight: 600, color: colors.text }}>{r.title}</h3>
            <div style={{ margin: "3px 0 0 0", color: colors.textSecondary, fontSize: 15 }}>
              {r.short}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

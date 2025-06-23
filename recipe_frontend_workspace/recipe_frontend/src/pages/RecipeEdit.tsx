import React from "react";
import { useTheme } from "../theme";

// PUBLIC_INTERFACE
export const RecipeEdit: React.FC = () => {
  const { colors } = useTheme();

  return (
    <section style={{
      maxWidth: 550,
      margin: "0 auto",
      background: colors.surface,
      borderRadius: 8,
      border: `1px solid ${colors.border}`,
      boxShadow: "0 1px 7px 0 rgba(0,0,0,0.06)",
      padding: "22px 18px",
    }}>
      <h2 style={{ color: colors.primary, marginBottom: 16 }}>Add / Edit Recipe</h2>
      <form>
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: colors.text, fontWeight: 500 }}>Title</label>
          <input type="text"
            style={{
              marginTop: 5,
              width: "100%",
              padding: "8px",
              border: `1px solid ${colors.border}`,
              borderRadius: 4,
            }}
            placeholder="e.g. Vegan Pad Thai" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: colors.text, fontWeight: 500 }}>Description</label>
          <textarea rows={3}
            style={{
              marginTop: 5,
              width: "100%",
              padding: "8px",
              border: `1px solid ${colors.border}`,
              borderRadius: 4,
            }}
            placeholder="Short description..." />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: colors.text, fontWeight: 500 }}>Ingredients</label>
          <textarea rows={2}
            style={{
              marginTop: 5,
              width: "100%",
              padding: "8px",
              border: `1px solid ${colors.border}`,
              borderRadius: 4,
            }}
            placeholder="- Carrots\n- Chickpeas" />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={{ color: colors.text, fontWeight: 500 }}>Steps</label>
          <textarea rows={3}
            style={{
              marginTop: 5,
              width: "100%",
              padding: "8px",
              border: `1px solid ${colors.border}`,
              borderRadius: 4,
            }}
            placeholder="Step-by-step instructions..." />
        </div>
        <button
          type="submit"
          style={{
            background: colors.secondary,
            color: "white",
            padding: "10px 30px",
            border: "none",
            borderRadius: 5,
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >Save</button>
      </form>
    </section>
  );
};

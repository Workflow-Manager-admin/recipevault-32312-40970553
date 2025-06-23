import React from "react";
import { useTheme } from "../theme";

// PUBLIC_INTERFACE
export const Auth: React.FC = () => {
  const { colors } = useTheme();

  // MVP: Dummy auth form, no logic
  return (
    <section style={{
      maxWidth: 390,
      margin: "60px auto",
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: 8,
      padding: "28px 18px"
    }}>
      <h2 style={{ color: colors.primary }}>Login</h2>
      <form>
        <div style={{ marginBottom: 14 }}>
          <label>Email</label>
          <input
            type="email"
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              border: `1px solid ${colors.border}`,
              borderRadius: 4
            }}
            placeholder="user@email.com"
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>Password</label>
          <input
            type="password"
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              border: `1px solid ${colors.border}`,
              borderRadius: 4
            }}
            placeholder="••••••••"
          />
        </div>
        <button
          style={{
            background: colors.primary,
            color: "white",
            padding: "9px 30px",
            border: "none",
            borderRadius: 5,
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </section>
  );
};

import React from "react";
import { useTheme } from "../theme";

// Dummy user data
const user = {
  name: "Jamie Oliver",
  email: "jamie@email.com",
};

// PUBLIC_INTERFACE
export const Profile: React.FC = () => {
  const { colors } = useTheme();

  return (
    <section style={{
      maxWidth: 390,
      margin: "0 auto",
      background: colors.surface,
      borderRadius: 8,
      border: `1px solid ${colors.border}`,
      boxShadow: "0 1px 6px 0 rgba(0,0,0,0.03)",
      padding: "22px 18px",
    }}>
      <h2 style={{ color: colors.primary, marginBottom: 16 }}>Profile</h2>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
    </section>
  );
};

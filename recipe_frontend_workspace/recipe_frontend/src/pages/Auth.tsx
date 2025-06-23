import React, { useState } from "react";
import { useTheme } from "../theme";
import { login, register } from "../services/api";

// PUBLIC_INTERFACE
export const Auth: React.FC<{ onAuth?: () => void }> = ({ onAuth }) => {
  const { colors } = useTheme();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // Only for register
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      if (isRegister) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      if (onAuth) onAuth();
      // Optionally: redirect or reload
    } catch (error: any) {
      setErr(error.message || "Error");
    }
    setLoading(false);
  }

  return (
    <section style={{
      maxWidth: 390,
      margin: "60px auto",
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: 8,
      padding: "28px 18px"
    }}>
      <h2 style={{ color: colors.primary }}>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {err && <div style={{ color: "red", marginBottom: 6 }}>{err}</div>}
        {isRegister && (
          <div style={{ marginBottom: 14 }}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              required
              onChange={e => setName(e.target.value)}
              style={{
                width: "100%",
                padding: 8,
                marginTop: 4,
                border: `1px solid ${colors.border}`,
                borderRadius: 4
              }}
              placeholder="Your Name"
            />
          </div>
        )}
        <div style={{ marginBottom: 14 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
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
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
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
          type="submit"
          style={{
            background: colors.primary,
            color: "white",
            padding: "9px 30px",
            border: "none",
            borderRadius: 5,
            fontWeight: 600,
            cursor: "pointer"
          }}
          disabled={loading}
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <div style={{ marginTop: 18, textAlign: "center" }}>
        {isRegister ? (
          <button
            style={{ background: "none", border: "none", color: colors.primary, cursor: "pointer" }}
            onClick={() => setIsRegister(false)}
            type="button"
          >
            Already have an account? Login
          </button>
        ) : (
          <button
            style={{ background: "none", border: "none", color: colors.primary, cursor: "pointer" }}
            onClick={() => setIsRegister(true)}
            type="button"
          >
            New user? Register
          </button>
        )}
      </div>
    </section>
  );
};

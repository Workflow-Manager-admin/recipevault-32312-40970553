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
    <section
      style={{
        maxWidth: 400,
        margin: "64px auto",
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: 10,
        boxShadow: "0 1px 7px 0 rgba(0,0,0,0.05)",
        padding: "34px 20px",
      }}
      aria-labelledby="auth-title"
      aria-live="polite"
    >
      <h2
        id="auth-title"
        style={{
          color: colors.primary,
          marginBottom: 20,
          fontSize: "1.6rem",
          fontWeight: 700,
          textAlign: "center"
        }}
      >
        {isRegister ? "Register" : "Login"}
      </h2>
      <form onSubmit={handleSubmit} aria-describedby={err ? "auth-error" : undefined}>
        {err && (
          <div
            id="auth-error"
            style={{
              color: "#ef4444",
              background: "#fff5f5",
              border: `1px solid #fde7e7`,
              padding: "9px 13px",
              borderRadius: 5,
              marginBottom: 10,
              fontWeight: 500,
              textAlign: "center"
            }}
            role="alert"
            aria-live="assertive"
            tabIndex={-1}
          >
            {err}
          </div>
        )}
        {isRegister && (
          <div style={{ marginBottom: 14 }}>
            <label htmlFor="regname" style={{ color: colors.text, fontWeight: 500 }}>
              Name
            </label>
            <input
              id="regname"
              type="text"
              autoComplete="name"
              value={name}
              required
              onChange={e => setName(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                marginTop: 4,
                border: `1px solid ${colors.border}`,
                borderRadius: 5,
                fontSize: 15,
              }}
              placeholder="Your Name"
              aria-required="true"
              aria-label="Full name"
            />
          </div>
        )}
        <div style={{ marginBottom: 14 }}>
          <label htmlFor="email" style={{ color: colors.text, fontWeight: 500 }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            required
            autoComplete="username"
            onChange={e => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 4,
              border: `1px solid ${colors.border}`,
              borderRadius: 5,
              fontSize: 15
            }}
            placeholder="user@email.com"
            aria-required="true"
            aria-label="Email"
          />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label htmlFor="password" style={{ color: colors.text, fontWeight: 500 }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            required
            autoComplete={isRegister ? "new-password" : "current-password"}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              marginTop: 4,
              border: `1px solid ${colors.border}`,
              borderRadius: 5,
              fontSize: 15
            }}
            placeholder="••••••••"
            aria-required="true"
            aria-label="Password"
          />
        </div>
        <button
          type="submit"
          style={{
            background: colors.primary,
            color: "#fff",
            padding: "11px 32px",
            border: "none",
            borderRadius: 7,
            fontWeight: 700,
            cursor: "pointer",
            width: "100%",
            fontSize: "1.05rem",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,0.07)",
            marginBottom: 7,
            transition: "background .15s",
            outline: "none"
          }}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className="visually-hidden">Loading …</span>
              <svg width="21" height="21" viewBox="0 0 24 24" style={{ verticalAlign: "middle" }} aria-hidden="true">
                <circle fill="none" stroke={colors.surface} strokeWidth="3" cx="12" cy="12" r="9" strokeDasharray="56.5487" strokeDashoffset="28" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="1s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </>
          ) : (
            isRegister ? "Register" : "Login"
          )}
        </button>
      </form>
      <div style={{ marginTop: 20, textAlign: "center" }}>
        {isRegister ? (
          <button
            style={{
              background: "none",
              border: "none",
              color: colors.primary,
              fontWeight: 500,
              cursor: "pointer",
              fontSize: 15,
              textDecoration: "underline",
              padding: 0
            }}
            onClick={() => setIsRegister(false)}
            type="button"
            tabIndex={0}
            aria-label="Switch to login form"
          >
            Already have an account? Login
          </button>
        ) : (
          <button
            style={{
              background: "none",
              border: "none",
              color: colors.primary,
              fontWeight: 500,
              cursor: "pointer",
              fontSize: 15,
              textDecoration: "underline",
              padding: 0
            }}
            onClick={() => setIsRegister(true)}
            type="button"
            tabIndex={0}
            aria-label="Switch to registration form"
          >
            New user? Register
          </button>
        )}
      </div>
    </section>
  );
};

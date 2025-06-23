import React, { useEffect, useState } from "react";
import { useTheme } from "../theme";
import { fetchProfile, updateProfile } from "../services/api";

// PUBLIC_INTERFACE
export const Profile: React.FC = () => {
  const { colors } = useTheme();
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProfile()
      .then((user) => {
        setProfile(user);
        setName(user.name);
      })
      .catch(() => setError("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const updated = await updateProfile({ name });
      setProfile(updated);
      setEdit(false);
    } catch {
      setError("Error updating profile");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div
        style={{
          color: colors.textSecondary,
          textAlign: "center",
          padding: "2.5rem 0",
          fontSize: 18,
          minHeight: 90,
        }}
        role="status"
        aria-live="polite"
      >
        <span className="visually-hidden">Loading…</span>
        <svg width="28" height="28" viewBox="0 0 24 24" style={{ verticalAlign: "middle" }} aria-hidden="true">
          <circle fill="none" stroke={colors.secondary} strokeWidth="3" cx="12" cy="12" r="9" strokeDasharray="56.5487" strokeDashoffset="28" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" values="0 12 12;360 12 12" dur="1s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    );
  }
  if (error) {
    return (
      <div
        style={{
          color: "#ef4444",
          background: "#fff5f5",
          border: `1px solid #fde7e7`,
          padding: "10px 16px",
          borderRadius: 5,
          margin: "30px auto",
          maxWidth: 400,
          textAlign: "center",
          fontWeight: 500,
          fontSize: 16,
        }}
        role="alert"
        aria-live="assertive"
        tabIndex={-1}
      >
        {error}
      </div>
    );
  }
  if (!profile) {
    return (
      <div style={{ color: colors.textSecondary, textAlign: "center", fontSize: 17, padding: "32px 0" }}>
        Profile not found.
      </div>
    );
  }

  return (
    <section
      style={{
        maxWidth: 390,
        margin: "0 auto",
        background: colors.surface,
        borderRadius: 10,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 1px 6px 0 rgba(0,0,0,0.03)",
        padding: "26px 13px 28px 15px",
      }}
      aria-labelledby="profile-title"
    >
      <h2
        id="profile-title"
        style={{
          color: colors.primary,
          marginBottom: 16,
          fontSize: "1.7rem",
          fontWeight: 700,
          textAlign: "center"
        }}
      >
        Profile
      </h2>
      {edit ? (
        <form onSubmit={handleSave} aria-describedby={error ? "profile-error" : undefined}>
          <div style={{ marginBottom: 14 }}>
            <label htmlFor="edit-name" style={{ color: colors.text, fontWeight: 500 }}>
              Name
            </label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                border: `1px solid ${colors.border}`,
                borderRadius: 5,
                padding: 9,
                width: "100%",
                fontSize: 15
              }}
              required
              aria-required="true"
              aria-label="Edit name"
              autoFocus
            />
          </div>
          <div style={{ marginBottom: 13 }}>
            <label htmlFor="edit-email" style={{ color: colors.textSecondary, fontWeight: 500 }}>
              Email
            </label>
            <input
              id="edit-email"
              value={profile.email}
              style={{
                width: "100%",
                border: `1px solid ${colors.border}`,
                borderRadius: 5,
                padding: 9,
                fontSize: 15,
                background: "#f4f4f4",
              }}
              readOnly
              aria-readonly="true"
              tabIndex={-1}
            />
          </div>
          <div style={{ marginTop: 18 }}>
            <button
              type="submit"
              style={{
                background: colors.secondary,
                color: "white",
                padding: "7px 23px",
                border: "none",
                borderRadius: 7,
                fontWeight: 600,
                marginRight: 10,
                cursor: "pointer",
                fontSize: "1rem",
                outline: "none"
              }}
              disabled={saving}
              aria-busy={saving}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEdit(false)}
              style={{
                background: "none",
                color: colors.primary,
                cursor: "pointer",
                border: "none",
                fontWeight: 500,
                fontSize: 15
              }}
              aria-label="Cancel edit"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div style={{ marginBottom: 13, color: colors.text }}>
            <strong>Name:</strong> {profile.name}
          </div>
          <div style={{ marginBottom: 13, color: colors.text }}>
            <strong>Email:</strong> {profile.email}
          </div>
          <button
            style={{
              marginTop: 11,
              background: colors.secondary,
              color: "white",
              padding: "8px 21px",
              border: "none",
              borderRadius: 7,
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "1rem",
              outline: "none"
            }}
            onClick={() => setEdit(true)}
            aria-label="Edit profile"
          >
            Edit
          </button>
        </>
      )}
    </section>
  );
};

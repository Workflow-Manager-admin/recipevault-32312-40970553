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

  useEffect(() => {
    fetchProfile()
      .then((user) => {
        setProfile(user);
        setName(user.name);
      })
      .catch(() => setError("Failed to load profile"));
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

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!profile)
    return (
      <div style={{ color: colors.textSecondary, textAlign: "center" }}>
        Loading...
      </div>
    );

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
      {edit ? (
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: 12 }}>
            <strong>Name:</strong>{" "}
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                border: `1px solid ${colors.border}`,
                borderRadius: 4,
                padding: 6,
              }}
              required
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Email:</strong> {profile.email}
          </div>
          <button
            type="submit"
            style={{
              background: colors.secondary,
              color: "white",
              padding: "6px 18px",
              border: "none",
              borderRadius: 5,
              fontWeight: 500,
              marginRight: 10,
              cursor: "pointer",
            }}
            disabled={saving}
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
              border: "none"
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div>
            <strong>Name:</strong> {profile.name}
          </div>
          <div>
            <strong>Email:</strong> {profile.email}
          </div>
          <button
            style={{
              marginTop: 20,
              background: colors.secondary,
              color: "white",
              padding: "7px 25px",
              border: "none",
              borderRadius: 5,
              fontWeight: 600,
              cursor: "pointer"
            }}
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        </>
      )}
    </section>
  );
};

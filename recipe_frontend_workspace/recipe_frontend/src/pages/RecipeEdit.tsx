import React, { useState } from "react";
import { useTheme } from "../theme";
import { createRecipe, updateRecipe, fetchRecipe } from "../services/api";

// PUBLIC_INTERFACE
// Accepts optional id for edit mode.
export const RecipeEdit: React.FC<{ id?: number, onSaved?: () => void }> = ({ id, onSaved }) => {
  const { colors } = useTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    if (id) {
      setLoading(true);
      fetchRecipe(id)
        .then(r => {
          setTitle(r.title || "");
          setDescription(r.description || "");
          setIngredients((r.ingredients || []).join("\n"));
          setSteps((r.steps || []).join("\n"));
        })
        .catch(() => setError("Error loading recipe"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const data = {
      title,
      description,
      ingredients: ingredients
        .split("\n")
        .map(s => s.trim())
        .filter(Boolean),
      steps: steps
        .split("\n")
        .map(s => s.trim())
        .filter(Boolean),
    };
    const req = id
      ? updateRecipe(id, data)
      : createRecipe(data);
    req
      .then(() => {
        setSuccess(true);
        if (onSaved) onSaved();
      })
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false));
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

  return (
    <section
      style={{
        maxWidth: 550,
        margin: "0 auto",
        background: colors.surface,
        borderRadius: 10,
        boxShadow: "0 1px 7px 0 rgba(0,0,0,0.06)",
        border: `1px solid ${colors.border}`,
        padding: "30px 16px 32px 16px",
      }}
      aria-labelledby="recipeedit-title"
    >
      <h2
        id="recipeedit-title"
        style={{
          color: colors.primary,
          marginBottom: 16,
          fontSize: "1.8rem",
          fontWeight: 700,
        }}
      >
        {id ? "Edit Recipe" : "Add Recipe"}
      </h2>
      <form onSubmit={handleSubmit} aria-describedby={error ? "edit-error" : undefined}>
        {error && (
          <div
            id="edit-error"
            style={{
              color: "#ef4444",
              background: "#fff5f5",
              border: `1px solid #fde7e7`,
              padding: "10px 13px",
              borderRadius: 5,
              marginBottom: 10,
              fontWeight: 500,
            }}
            role="alert"
            aria-live="assertive"
            tabIndex={-1}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              color: colors.secondary,
              background: "#e6fff0",
              border: `1px solid ${colors.secondary}`,
              borderRadius: 5,
              padding: "9px 13px",
              marginBottom: 10,
              fontWeight: 500,
            }}
            role="status"
            aria-live="polite"
            tabIndex={-1}
          >
            Recipe saved!
          </div>
        )}
        <div style={{ marginBottom: 17 }}>
          <label htmlFor="edit-title" style={{ color: colors.text, fontWeight: 500 }}>
            Title
          </label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{
              marginTop: 5,
              width: "100%",
              padding: "10px",
              border: `1px solid ${colors.border}`,
              borderRadius: 5,
              fontSize: 16,
            }}
            placeholder="e.g. Vegan Pad Thai"
            required
            aria-required="true"
          />
        </div>
        <div style={{ marginBottom: 17 }}>
          <label htmlFor="edit-desc" style={{ color: colors.text, fontWeight: 500 }}>
            Description
          </label>
          <textarea
            id="edit-desc"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{
              marginTop: 5,
              width: "100%",
              padding: "10px",
              border: `1px solid ${colors.border}`,
              borderRadius: 5,
              fontSize: 15,
              minHeight: 50,
            }}
            placeholder="Short description..."
            required
            aria-required="true"
          />
        </div>
        <div style={{ marginBottom: 17 }}>
          <label htmlFor="edit-ingr" style={{ color: colors.text, fontWeight: 500 }}>
            Ingredients
          </label>
          <textarea
            id="edit-ingr"
            rows={2}
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
            style={{
              marginTop: 5,
              width: "100%",
              padding: "10px",
              border: `1px solid ${colors.border}`,
              borderRadius: 5,
              fontSize: 15,
              minHeight: 36,
            }}
            placeholder="- Carrots\n- Chickpeas"
            required
            aria-required="true"
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label htmlFor="edit-steps" style={{ color: colors.text, fontWeight: 500 }}>
            Steps
          </label>
          <textarea
            id="edit-steps"
            rows={3}
            value={steps}
            onChange={e => setSteps(e.target.value)}
            style={{
              marginTop: 5,
              width: "100%",
              padding: "10px",
              border: `1px solid ${colors.border}`,
              borderRadius: 5,
              fontSize: 15,
            }}
            placeholder="Step-by-step instructions..."
            required
            aria-required="true"
          />
        </div>
        <button
          type="submit"
          style={{
            background: colors.secondary,
            color: "#fff",
            padding: "11px 32px",
            border: "none",
            borderRadius: 6,
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "1.02rem",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,0.06)",
            transition: "background .15s",
            outline: "none",
          }}
          disabled={loading}
        >
          Save
        </button>
      </form>
    </section>
  );
};

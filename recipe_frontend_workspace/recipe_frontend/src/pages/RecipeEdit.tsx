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

  if (loading) return <div style={{ color: colors.textSecondary, textAlign: "center" }}>Loading...</div>;

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
      <h2 style={{ color: colors.primary, marginBottom: 16 }}>{id ? "Edit Recipe" : "Add Recipe"}</h2>
      <form onSubmit={handleSubmit}>
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        {success && <div style={{ color: colors.secondary, marginBottom: 10 }}>Recipe saved!</div>}
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: colors.text, fontWeight: 500 }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{
              marginTop: 5,
              width: "100%",
              padding: "8px",
              border: `1px solid ${colors.border}`,
              borderRadius: 4,
            }}
            placeholder="e.g. Vegan Pad Thai"
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: colors.text, fontWeight: 500 }}>Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{
              marginTop: 5,
              width: "100%",
              padding: "8px",
              border: `1px solid ${colors.border}`,
              borderRadius: 4,
            }}
            placeholder="Short description..."
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: colors.text, fontWeight: 500 }}>Ingredients</label>
          <textarea
            rows={2}
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
            style={{
              marginTop: 5,
              width: "100%",
              padding: "8px",
              border: `1px solid ${colors.border}`,
              borderRadius: 4,
            }}
            placeholder="- Carrots\n- Chickpeas"
            required
          />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={{ color: colors.text, fontWeight: 500 }}>Steps</label>
          <textarea
            rows={3}
            value={steps}
            onChange={e => setSteps(e.target.value)}
            style={{
              marginTop: 5,
              width: "100%",
              padding: "8px",
              border: `1px solid ${colors.border}`,
              borderRadius: 4,
            }}
            placeholder="Step-by-step instructions..."
            required
          />
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
          disabled={loading}
        >Save</button>
      </form>
    </section>
  );
};

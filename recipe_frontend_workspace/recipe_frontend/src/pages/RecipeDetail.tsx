import React, { useEffect, useState } from "react";
import { useTheme } from "../theme";
import { fetchRecipe } from "../services/api";

// PUBLIC_INTERFACE
// Now expects a prop: id (recipe id)
export const RecipeDetail: React.FC<{ id: number }> = ({ id }) => {
  const { colors } = useTheme();
  const [recipe, setRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setErr(null);
    fetchRecipe(id)
      .then((data) => { if (!ignore) setRecipe(data); })
      .catch((error) => {
        if (!ignore) {
          setRecipe(null);
          setErr("Failed to load recipe.");
        }
      })
      .finally(() => { if (!ignore) setLoading(false); });
    return () => { ignore = true; };
  }, [id]);

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
  if (err) {
    return (
      <div
        style={{
          color: "#ef4444",
          background: "#fff5f5",
          border: `1px solid #fde7e7`,
          padding: "10px 16px",
          borderRadius: 5,
          margin: "30px auto",
          maxWidth: 430,
          textAlign: "center",
          fontWeight: 500,
          fontSize: 16,
        }}
        role="alert"
        aria-live="assertive"
        tabIndex={-1}
      >
        {err}
      </div>
    );
  }
  if (!recipe) {
    return (
      <div style={{ color: colors.textSecondary, textAlign: "center", fontSize: 17, padding: "35px 0" }}>
        Recipe not found.
      </div>
    );
  }

  return (
    <section
      style={{
        maxWidth: 630,
        margin: "0 auto",
        background: colors.surface,
        borderRadius: 10,
        boxShadow: "0 1px 7px 0 rgba(0,0,0,0.045)",
        border: `1px solid ${colors.border}`,
        padding: "30px 18px 32px 18px",
      }}
      aria-labelledby="recipedetail-title"
    >
      <h2
        id="recipedetail-title"
        style={{
          color: colors.primary,
          marginBottom: 8,
          fontSize: "2rem",
          fontWeight: 700,
        }}
      >
        {recipe.title}
      </h2>
      <div
        style={{
          marginBottom: 22,
          color: colors.text,
          fontSize: 18,
          opacity: 0.95,
        }}
        tabIndex={0}
      >
        {recipe.description}
      </div>
      <div style={{ marginBottom: 18 }}>
        <strong style={{ color: colors.secondary, display: "block", marginBottom: 6, fontSize: 16 }}>Ingredients:</strong>
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          <ul
            style={{
              margin: 0,
              paddingLeft: 22,
              color: colors.text,
              fontSize: 15,
              lineHeight: 1.8,
              background: "#fff",
              borderRadius: 4,
            }}
            aria-label="Ingredients list"
          >
            {recipe.ingredients.map((item: string, idx: number) => (
              <li key={idx} tabIndex={0}>{item}</li>
            ))}
          </ul>
        ) : (
          <em style={{ color: colors.textSecondary, fontSize: 15 }}>No ingredients listed.</em>
        )}
      </div>
      <div>
        <strong style={{ color: colors.secondary, display: "block", marginBottom: 6, fontSize: 16 }}>Steps:</strong>
        {recipe.steps && recipe.steps.length > 0 ? (
          <ol
            style={{
              margin: 0,
              paddingLeft: 22,
              color: colors.text,
              fontSize: 15,
              lineHeight: 1.8,
              background: "#fff",
              borderRadius: 4,
            }}
            aria-label="Cooking steps list"
          >
            {recipe.steps.map((step: string, idx: number) => (
              <li key={idx} tabIndex={0}>{step}</li>
            ))}
          </ol>
        ) : (
          <em style={{ color: colors.textSecondary, fontSize: 15 }}>No steps provided.</em>
        )}
      </div>
    </section>
  );
};

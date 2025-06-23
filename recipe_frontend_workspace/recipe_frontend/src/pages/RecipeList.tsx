import React, { useEffect, useState } from "react";
import { useTheme } from "../theme";
import { fetchRecipes } from "../services/api";

// PUBLIC_INTERFACE
export const RecipeList: React.FC = () => {
  const { colors } = useTheme();
  const [recipes, setRecipes] = useState<{ id: number; title: string; description?: string }[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    fetchRecipes(search)
      .then((data) => {
        if (!ignore) setRecipes(data);
      })
      .catch((e) => {
        if (!ignore) {
          setRecipes([]);
          setError("Failed to load recipes.");
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => { ignore = true; };
  }, [search]);

  // Responsive/Minimal styles
  const containerStyle: React.CSSProperties = {
    maxWidth: 600,
    width: "100%",
    margin: "0 auto",
    padding: "1rem 0.5rem",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    marginBottom: "22px",
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    fontSize: 16,
    outline: "none",
    background: colors.surface,
    color: colors.text,
    boxSizing: "border-box",
  };

  const listStyle: React.CSSProperties = {
    padding: 0,
    listStyle: "none",
    margin: 0,
    minHeight: 150,
  };

  const emptyState = !loading && !recipes.length && !error && (
    <div
      style={{
        textAlign: "center",
        color: colors.textSecondary,
        fontSize: 17,
        padding: "26px 0",
        opacity: 0.85,
      }}
      role="status"
      aria-live="polite"
    >
      No recipes found. Try a different search or add a new recipe.
    </div>
  );

  const errorState = error && (
    <div
      style={{
        color: "#ef4444",
        background: "#fff5f5",
        border: `1px solid #fde7e7`,
        padding: "10px 16px",
        borderRadius: 5,
        textAlign: "center",
        marginBottom: 18,
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

  return (
    <section style={containerStyle} aria-labelledby="recipes-heading">
      <h2
        id="recipes-heading"
        style={{
          color: colors.primary,
          marginBottom: 22,
          fontSize: "2rem",
          fontWeight: 700,
        }}
      >
        Recipes
      </h2>
      <label htmlFor="search-input" style={{ display: "block", marginBottom: 4, color: colors.textSecondary, fontWeight: 500 }}>
        Search
      </label>
      <input
        id="search-input"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search recipes…"
        style={inputStyle}
        type="text"
        aria-label="Search recipes"
        aria-busy={loading}
        autoComplete="off"
      />
      {errorState}
      {loading ? (
        <div
          style={{
            textAlign: "center",
            color: colors.textSecondary,
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
      ) : (
        <>
          <ul style={listStyle} aria-live="polite">
            {recipes.map(r => (
              <li
                key={r.id}
                style={{
                  background: colors.surface,
                  marginBottom: 16,
                  borderRadius: 10,
                  boxShadow: "0 1px 7px 0 rgba(0,0,0,0.04)",
                  padding: "18px 18px",
                  transition: "box-shadow .18s",
                  border: `1px solid ${colors.border}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  cursor: "pointer",
                  minHeight: 68,
                  outline: "none",
                }}
                tabIndex={0}
                role="listitem"
                aria-label={`Recipe: ${r.title}`}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    // Accessible navigation hook-in
                  }
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    color: colors.text,
                    fontSize: 20,
                  }}
                >
                  {r.title}
                </h3>
                <div style={{ margin: 0, color: colors.textSecondary, fontSize: 15, opacity: 0.88 }}>
                  {r.description || <span style={{ color: "#bababa" }}>No description</span>}
                </div>
              </li>
            ))}
          </ul>
          {emptyState}
        </>
      )}
    </section>
  );
};

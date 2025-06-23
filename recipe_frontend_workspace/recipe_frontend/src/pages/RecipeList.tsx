import React, { useEffect, useState } from "react";
import { useTheme } from "../theme";
import { fetchRecipes } from "../services/api";

// PUBLIC_INTERFACE
export const RecipeList: React.FC = () => {
  const { colors } = useTheme();
  const [recipes, setRecipes] = useState<{ id: number; title: string; description?: string }[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetchRecipes(search)
      .then((data) => {
        if (!ignore) setRecipes(data);
      })
      .catch(() => {
        if (!ignore) setRecipes([]);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => { ignore = true; };
  }, [search]);

  return (
    <section style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ color: colors.primary, marginBottom: 22 }}>Recipes</h2>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search recipes..."
        style={{
          width: "100%",
          padding: "9px",
          marginBottom: "20px",
          border: `1px solid ${colors.border}`,
          borderRadius: 4,
        }}
        type="text"
      />
      {loading ? (
        <div style={{ textAlign: "center", color: colors.textSecondary }}>Loading...</div>
      ) : (
        <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
          {recipes.map(r => (
            <li
              key={r.id}
              style={{
                background: colors.surface,
                marginBottom: 16,
                borderRadius: 7,
                boxShadow: "0 1px 7px 0 rgba(0,0,0,0.04)",
                padding: "18px 18px",
                transition: "box-shadow .18s",
                border: `1px solid ${colors.border}`,
              }}
            >
              <h3 style={{ margin: 0, fontWeight: 600, color: colors.text }}>{r.title}</h3>
              <div style={{ margin: "3px 0 0 0", color: colors.textSecondary, fontSize: 15 }}>
                {r.description || ""}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

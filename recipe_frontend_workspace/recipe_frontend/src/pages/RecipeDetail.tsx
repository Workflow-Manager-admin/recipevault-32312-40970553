import React, { useEffect, useState } from "react";
import { useTheme } from "../theme";
import { fetchRecipe } from "../services/api";

// PUBLIC_INTERFACE
// Now expects a prop: id (recipe id)
export const RecipeDetail: React.FC<{ id: number }> = ({ id }) => {
  const { colors } = useTheme();
  const [recipe, setRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetchRecipe(id)
      .then((data) => { if (!ignore) setRecipe(data); })
      .catch(() => { if (!ignore) setRecipe(null); })
      .finally(() => { if (!ignore) setLoading(false); });
    return () => { ignore = true; };
  }, [id]);

  if (loading) return <div style={{ color: colors.textSecondary, textAlign: "center" }}>Loading...</div>;
  if (!recipe) return <div style={{ color: colors.textSecondary, textAlign: "center" }}>Recipe not found.</div>;

  return (
    <section style={{ maxWidth: 630, margin: "0 auto" }}>
      <h2 style={{ color: colors.primary, marginBottom: 10 }}>{recipe.title}</h2>
      <div style={{ marginBottom: 20, color: colors.text }}>
        {recipe.description}
      </div>
      <div>
        <strong>Ingredients:</strong>
        <ul>
          {recipe.ingredients?.map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Steps:</strong>
        <ol>
          {recipe.steps?.map((step: string, idx: number) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
};

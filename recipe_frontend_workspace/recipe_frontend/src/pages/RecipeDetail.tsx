import React from "react";
import { useTheme } from "../theme";

const DUMMY = {
  id: 1,
  title: "Classic Spaghetti Carbonara",
  description: "A Roman favourite made with eggs, cheese, pancetta, and pepper.",
  ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmigiano-Reggiano", "Black pepper"],
  steps: [
    "Boil pasta until al dente.",
    "Fry pancetta until crisp.",
    "Whisk eggs and cheese together.",
    "Combine everything off the heat and serve!",
  ],
};

// PUBLIC_INTERFACE
export const RecipeDetail: React.FC = () => {
  const { colors } = useTheme();

  return (
    <section style={{ maxWidth: 630, margin: "0 auto" }}>
      <h2 style={{ color: colors.primary, marginBottom: 10 }}>{DUMMY.title}</h2>
      <div style={{ marginBottom: 20, color: colors.text }}>
        {DUMMY.description}
      </div>
      <div>
        <strong>Ingredients:</strong>
        <ul>
          {DUMMY.ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Steps:</strong>
        <ol>
          {DUMMY.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
};

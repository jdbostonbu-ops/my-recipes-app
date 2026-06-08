// app/recipes/recipe-card.js
import Link from "next/link";

export default function RecipeCard({ recipe }) {
  const categoryColors = {
    Italian: "#e74c3c",
    Asian: "#f39c12",
    Mexican: "#2ecc71",
    Mediterranean: "#3498db",
    Baking: "#9b59b6",
  };

  const badgeColor = categoryColors[recipe.category] || "#95a5a6";

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div style={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        cursor: "pointer",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h2 style={{ margin: "0 0 8px 0", fontSize: "20px" }}>{recipe.title}</h2>
          {recipe.category && (
            <span style={{
              backgroundColor: badgeColor,
              color: "white",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "bold",
            }}>
              {recipe.category}
            </span>
          )}
        </div>
        <p style={{ color: "#666", margin: "8px 0", fontSize: "14px", lineHeight: "1.5" }}>
          {recipe.description}
        </p>
        <div style={{ display: "flex", gap: "16px", fontSize: "13px", color: "#999", marginTop: "12px" }}>
          {recipe.prepTime && <span>Prep: {recipe.prepTime} min</span>}
          {recipe.author && <span>By: {recipe.author.name}</span>}
        </div>
      </div>
    </Link>
  );
}
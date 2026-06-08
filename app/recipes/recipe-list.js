// app/recipes/recipe-list.js
"use client";

import { useState, useEffect } from "react";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecipes() {
      const response = await fetch("/api/recipes");
      const data = await response.json();
      setRecipes(data);
      setLoading(false);
    }
    loadRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase()) ||
    (recipe.category && recipe.category.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <p>Loading recipes...</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          border: "2px solid #ddd",
          borderRadius: "8px",
          marginBottom: "20px",
          boxSizing: "border-box",
        }}
      />

      <p style={{ color: "#666" }}>
        Showing {filteredRecipes.length} of {recipes.length} recipes
      </p>

      {filteredRecipes.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            margin: "12px 0",
            backgroundColor: "#fafafa",
          }}
        >
          <h2 style={{ margin: "0 0 8px 0" }}>{recipe.title}</h2>
          <p style={{ color: "#666", margin: "4px 0" }}>{recipe.description}</p>
          <div style={{ display: "flex", gap: "16px", fontSize: "14px", color: "#888" }}>
            {recipe.category && <span>Category: {recipe.category}</span>}
            {recipe.prepTime && <span>Prep: {recipe.prepTime} min</span>}
          </div>
        </div>
      ))}

      {filteredRecipes.length === 0 && (
        <p style={{ color: "#999", textAlign: "center" }}>
          No recipes match your search.
        </p>
      )}
    </div>
  );
}
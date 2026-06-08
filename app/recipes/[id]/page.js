// app/recipes/[id]/page.js
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function RecipeDetailPage({ params }) {
  const { id } = await params;

  const recipe = await prisma.recipe.findUnique({
    where: { id: parseInt(id, 10) },
    include: { author: true },
  });

  if (!recipe) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h1>Recipe Not Found</h1>
        <p>No recipe with ID {id} exists.</p>
        <Link href="/recipes" style={{ color: "#3498db" }}>
          Back to all recipes
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "700px" }}>
      <Link
        href="/recipes"
        style={{ color: "#3498db", textDecoration: "none", fontSize: "14px" }}
      >
        &larr; Back to all recipes
      </Link>

      <h1 style={{ marginTop: "16px", marginBottom: "8px" }}>{recipe.title}</h1>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        {recipe.category && (
          <span style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "13px",
          }}>
            {recipe.category}
          </span>
        )}
        {recipe.prepTime && (
          <span style={{
            backgroundColor: "#f0f0f0",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "13px",
          }}>
            {recipe.prepTime} minutes
          </span>
        )}
      </div>

      <div style={{
        backgroundColor: "#fafafa",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "20px",
      }}>
        <h2 style={{ margin: "0 0 12px 0", fontSize: "18px" }}>Description</h2>
        <p style={{ lineHeight: "1.6", color: "#444" }}>
          {recipe.description || "No description provided."}
        </p>
      </div>

      {recipe.author && (
        <div style={{ fontSize: "14px", color: "#888" }}>
          <p>Created by <strong>{recipe.author.name}</strong></p>
          <p>Added on {new Date(recipe.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}
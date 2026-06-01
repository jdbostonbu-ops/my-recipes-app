"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  getSavedRecipesSnapshot,
  subscribeToSavedRecipes,
} from "@/lib/recipe-storage";
import { getRecipeById } from "@/lib/recipes";

const getServerSnapshot = () => {
  return [];
};

const RecipeDetail = () => {
  const { id } = useParams();
  const savedRecipes = useSyncExternalStore(
    subscribeToSavedRecipes,
    getSavedRecipesSnapshot,
    getServerSnapshot,
  );
  const recipe =
    savedRecipes.find((savedRecipe) => savedRecipe.id === id) ||
    getRecipeById(id);

  if (!recipe) {
    return (
      <main className="page-shell narrow">
        <Link className="back-link" href="/recipes">
          Back to recipes
        </Link>
        <section className="section">
          <p className="eyebrow">Recipe detail</p>
          <h1>Recipe not found</h1>
          <p>This recipe is not saved in this browser.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell narrow">
      <Link className="back-link" href="/recipes">
        Back to recipes
      </Link>

      <section className="section">
        <p className="eyebrow">Recipe detail</p>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        <div className="meta-row">
          <span>{recipe.time || "No time set"}</span>
          <span>{recipe.servings} servings</span>
          <span>ID: {id}</span>
        </div>
      </section>

      <section className="detail-grid">
        <div className="info-panel">
          <h2>Ingredients</h2>
          {recipe.ingredients.length ? (
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          ) : (
            <p>No ingredients saved yet.</p>
          )}
        </div>

        <div className="info-panel">
          <h2>Steps</h2>
          {recipe.steps.length ? (
            <ol>
              {recipe.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : (
            <p>No steps saved yet.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default RecipeDetail;

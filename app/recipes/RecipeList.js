"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  getSavedRecipesSnapshot,
  subscribeToSavedRecipes,
} from "@/lib/recipe-storage";
import { recipes as starterRecipes } from "@/lib/recipes";

const getServerSnapshot = () => {
  return [];
};

const RecipeList = () => {
  const savedRecipes = useSyncExternalStore(
    subscribeToSavedRecipes,
    getSavedRecipesSnapshot,
    getServerSnapshot,
  );
  const recipes = [...savedRecipes, ...starterRecipes];

  return (
    <section className="recipe-list">
      {recipes.map((recipe) => (
        <Link
          className="recipe-row"
          href={`/recipes/${recipe.id}`}
          key={recipe.id}
        >
          <div>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
          </div>
          <span>
            {recipe.time || "No time set"} | {recipe.servings} servings
          </span>
        </Link>
      ))}
    </section>
  );
};

export default RecipeList;

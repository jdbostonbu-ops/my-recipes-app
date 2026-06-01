"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createRecipeId, saveRecipe } from "@/lib/recipe-storage";

const linesToList = (value) => {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

const RecipeForm = () => {
  const router = useRouter();
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") || "").trim();

    if (!title) {
      setStatus("Add a recipe name before saving.");
      return;
    }

    const recipe = saveRecipe({
      id: createRecipeId(title),
      title,
      time: formData.get("time"),
      servings: formData.get("servings"),
      description: formData.get("description"),
      ingredients: linesToList(String(formData.get("ingredients") || "")),
      steps: linesToList(String(formData.get("steps") || "")),
    });

    setStatus("Recipe saved in this browser.");
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <label htmlFor="recipe-title">
        Recipe name
        <input
          id="recipe-title"
          name="title"
          type="text"
          placeholder="Chicken tacos"
          required
        />
      </label>

      <label htmlFor="recipe-time">
        Cooking time
        <input id="recipe-time" name="time" type="text" placeholder="25 min" />
      </label>

      <label htmlFor="recipe-servings">
        Servings
        <input
          id="recipe-servings"
          min="1"
          name="servings"
          type="number"
          placeholder="4"
        />
      </label>

      <label htmlFor="recipe-description">
        Description
        <textarea
          id="recipe-description"
          name="description"
          placeholder="A short note about this recipe"
          rows="4"
        />
      </label>

      <label htmlFor="recipe-ingredients">
        Ingredients
        <textarea
          id="recipe-ingredients"
          name="ingredients"
          placeholder="Add one ingredient per line"
          rows="5"
        />
      </label>

      <label htmlFor="recipe-steps">
        Steps
        <textarea
          id="recipe-steps"
          name="steps"
          placeholder="Add one step per line"
          rows="5"
        />
      </label>

      <div className="form-actions">
        <button className="button primary" type="submit">
          Save recipe
        </button>
        {status ? <p className="form-status">{status}</p> : null}
      </div>
    </form>
  );
};

export default RecipeForm;

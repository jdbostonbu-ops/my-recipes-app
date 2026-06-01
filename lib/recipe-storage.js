const STORAGE_KEY = "my-recipes-app.recipes";
const STORAGE_EVENT = "my-recipes-app:recipes-changed";
let cachedRawRecipes;
let cachedRecipes = [];

const normalizeRecipe = (recipe) => {
  return {
    id: String(recipe.id || ""),
    title: String(recipe.title || "").trim(),
    time: String(recipe.time || "").trim(),
    servings: Number(recipe.servings) || 1,
    description: String(recipe.description || "").trim(),
    ingredients: Array.isArray(recipe.ingredients)
      ? recipe.ingredients.map(String).filter(Boolean)
      : [],
    steps: Array.isArray(recipe.steps)
      ? recipe.steps.map(String).filter(Boolean)
      : [],
  };
};

const hasBrowserStorage = () => {
  return typeof window !== "undefined" && window.localStorage;
};

export const createRecipeId = (title) => {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${slug || "recipe"}-${Date.now()}`;
};

export const getSavedRecipes = () => {
  if (!hasBrowserStorage()) {
    return [];
  }

  try {
    const storedRecipes = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return Array.isArray(storedRecipes)
      ? storedRecipes.map(normalizeRecipe)
      : [];
  } catch {
    return [];
  }
};

export const getSavedRecipesSnapshot = () => {
  if (!hasBrowserStorage()) {
    return [];
  }

  const rawRecipes = window.localStorage.getItem(STORAGE_KEY) || "";

  if (rawRecipes === cachedRawRecipes) {
    return cachedRecipes;
  }

  cachedRawRecipes = rawRecipes;
  cachedRecipes = getSavedRecipes();
  return cachedRecipes;
};

export const saveRecipe = (recipe) => {
  const savedRecipes = getSavedRecipes();
  const nextRecipe = normalizeRecipe(recipe);
  const nextRecipes = [
    nextRecipe,
    ...savedRecipes.filter((savedRecipe) => savedRecipe.id !== nextRecipe.id),
  ];

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecipes));
  window.dispatchEvent(new Event(STORAGE_EVENT));
  return nextRecipe;
};

export const subscribeToSavedRecipes = (callback) => {
  const handleStorage = (event) => {
    if (!event.key || event.key === STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener(STORAGE_EVENT, callback);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(STORAGE_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
  };
};

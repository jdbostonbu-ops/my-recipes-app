export const recipes = [
  {
    id: "spaghetti",
    title: "Weeknight Spaghetti",
    time: "30 min",
    servings: 4,
    description:
      "A simple tomato pasta with garlic, herbs, and parmesan for a fast dinner.",
    ingredients: [
      "12 oz spaghetti",
      "2 cups tomato sauce",
      "2 cloves garlic",
      "1 tbsp olive oil",
      "Parmesan cheese",
    ],
    steps: [
      "Cook spaghetti in salted water until al dente.",
      "Warm olive oil and garlic in a skillet.",
      "Stir in tomato sauce and simmer for 10 minutes.",
      "Toss pasta with sauce and finish with parmesan.",
    ],
  },
  {
    id: "chicken-tacos",
    title: "Chicken Tacos",
    time: "25 min",
    servings: 3,
    description:
      "Juicy seasoned chicken tucked into warm tortillas with crisp toppings.",
    ingredients: [
      "1 lb chicken breast",
      "6 corn tortillas",
      "1 tsp chili powder",
      "1 avocado",
      "Fresh cilantro",
    ],
    steps: [
      "Season and cook chicken until browned and cooked through.",
      "Slice chicken into bite-size pieces.",
      "Warm tortillas in a dry skillet.",
      "Fill tortillas with chicken, avocado, and cilantro.",
    ],
  },
  {
    id: "berry-oats",
    title: "Berry Overnight Oats",
    time: "10 min",
    servings: 2,
    description:
      "Creamy oats with berries and yogurt, ready to grab from the fridge.",
    ingredients: [
      "1 cup rolled oats",
      "1 cup milk",
      "1/2 cup Greek yogurt",
      "1 cup mixed berries",
      "1 tbsp honey",
    ],
    steps: [
      "Mix oats, milk, yogurt, and honey in a jar.",
      "Fold in half of the berries.",
      "Refrigerate overnight.",
      "Top with remaining berries before serving.",
    ],
  },
];

export const getRecipeById = (id) => {
  return recipes.find((recipe) => recipe.id === id);
};

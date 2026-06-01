import Link from "next/link";
import { recipes } from "@/lib/recipes";

const Home = () => {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Recipe keeper</p>
        <h1>Plan meals from recipes you actually want to cook.</h1>
        <p>
          Browse your saved recipes, open a recipe detail page, or start a new
          recipe draft.
        </p>
        <div className="actions">
          <Link className="button primary" href="/recipes">
            View recipes
          </Link>
          <Link className="button secondary" href="/recipes/new">
            Add recipe
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Featured recipes</h2>
          <Link href="/recipes">See all</Link>
        </div>
        <div className="recipe-grid">
          {recipes.slice(0, 3).map((recipe) => (
            <Link
              className="recipe-card"
              href={`/recipes/${recipe.id}`}
              key={recipe.id}
            >
              <span>{recipe.time}</span>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;

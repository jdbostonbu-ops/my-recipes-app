import Link from "next/link";
import RecipeList from "./RecipeList";

const RecipesPage = () => {
  return (
    <main className="page-shell">
      <section className="section-heading top-heading">
        <div>
          <p className="eyebrow">Recipes</p>
          <h1>All Recipes</h1>
        </div>
        <Link className="button primary" href="/recipes/new">
          Add recipe
        </Link>
      </section>

      <RecipeList />
    </main>
  );
};

export default RecipesPage;

import RecipeForm from "../RecipeForm";

const NewRecipePage = () => {
  return (
    <main className="page-shell narrow">
      <section className="section">
        <p className="eyebrow">New recipe</p>
        <h1>Add New Recipe</h1>
        <p>
          Save a recipe to this browser so it stays available on this device.
        </p>
      </section>

      <RecipeForm />
    </main>
  );
};

export default NewRecipePage;

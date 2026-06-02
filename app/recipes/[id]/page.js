import RecipeDetail from "../RecipeDetail";

const RecipeDetailPage = () => {
  return <RecipeDetail />;
};

export function generateStaticParams() {
  return [{ id: 'placeholder' }];
}

export default RecipeDetailPage;

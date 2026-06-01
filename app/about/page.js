const AboutPage = () => {
  return (
    <main className="page-shell narrow">
      <section className="section">
        <p className="eyebrow">About</p>
        <h1>My Recipes keeps favorite meals in one simple place.</h1>
        <p>
          Use this app to collect repeatable recipes, review ingredients before
          cooking, and jump straight to the meals you make most often.
        </p>
      </section>

      <section className="info-panel">
        <h2>What is here now</h2>
        <ul>
          <li>A home page with featured recipes.</li>
          <li>A recipes page with links to individual recipes.</li>
          <li>A dynamic recipe detail route at /recipes/[id].</li>
          <li>A new recipe page with a starter form layout.</li>
        </ul>
      </section>
    </main>
  );
};

export default AboutPage;

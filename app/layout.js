import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "My Recipes App",
  description: "Save and browse favorite recipes.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            My Recipes
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            <Link href="/about">About</Link>
            <Link href="/recipes">Recipes</Link>
            <Link href="/recipes/new">New Recipe</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

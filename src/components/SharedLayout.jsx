import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
export const SharedLayout = () => {
  return (
    <>
      <header className="app-header">
        <nav className="app-nav">
          <Link to="/">Home</Link>
          <Link to="/search">search for recipe</Link>
          <Link to="/ingridients">Ingridients</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

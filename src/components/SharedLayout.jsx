import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
export const SharedLayout = () => {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <br></br>
          <Link to="/search">search for recipe</Link>
          <br/>
          <Link to="/ingridients">Ingridients</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

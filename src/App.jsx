import logo from "./logo.svg";
import "./App.css";
import "./styles/sharedLayout.css";
import "./styles/searchPage.css";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout";
import { SearchPage } from "./pages/SearchPage";
import { IngridientSearch } from "./pages/IngridientSearch";
import { RecipeDetails } from "./pages/RecipeDetails";
function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="search" element={<SearchPage />} />
        <Route path="search/:id" element={<RecipeDetails />} />
        <Route path="ingridients" element={<IngridientSearch />} />
      </Route>
    </Routes>
  );
}

export default App;

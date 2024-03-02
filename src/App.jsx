import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout";
import { SearchPage } from "./pages/SearchPage";
import { IngridientSearch } from "./pages/IngridientSearch";
function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="search" element={<SearchPage />} />
        <Route path="ingridients" element={<IngridientSearch />} />
      </Route>
    </Routes>
  );
}

export default App;

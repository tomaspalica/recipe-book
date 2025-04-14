import { useEffect, useState } from "react";
import { fetchRecipes } from "../apiFetch/Api";
import { useSearchParams } from "react-router-dom";
import { RecipeList } from "./RecipeList";
export const SearchForm = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const fetchData = async () => {
    try {
      const response = await fetchRecipes(query);
      console.log(response);
      setRecipeList(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (query === "" || query === null) {
      setRecipeList([]);
      return;
    }
    fetchData();
  }, [searchParams, query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    setSearchParams({ query: value });
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder={query}
        />
        <button className="search-button">search</button>
      </form>
      <RecipeList recipeList={recipeList}></RecipeList>
    </>
  );
};

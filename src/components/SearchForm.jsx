import { useEffect, useState } from "react";
import { fetchRecipes } from "../apiFetch/Api";
import { useSearchParams } from "react-router-dom";
import { SearchList } from "./SearchList";
export const SearchForm = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  useEffect(() => {
    if (query === "" || query === null) {
      setRecipeList([]);
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetchRecipes(query);
        setRecipeList(response.data.results);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    setSearchParams({ query: value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" />
        <button>search</button>
      </form>
      <SearchList recipeList={recipeList}></SearchList>
    </>
  );
};

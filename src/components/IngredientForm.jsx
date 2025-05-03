import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchRecipesByIngredients } from "../apiFetch/Api";
import { RecipeList } from "./RecipeList";
import { Pagination } from "./Pagination";
import { usePagination } from "../utils/usePagination";
export const IngredientForm = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const currentPage = searchParams.get("page");
  // in future add a check of some sort for users to check if they want to ignore pantry items in their search or they want to include them
  useEffect(() => {
    if (query === "" || query === null) {
      setRecipeList([]);
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetchRecipesByIngredients(query);
        setRecipeList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [searchParams, query, currentPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      query === e.target[0].placeholder &&
      e.target.search.value.length === 0
    ) {
      setSearchParams({ query: query, page: currentPage });
    } else {
      const inputValue = e.target.search.value.split(" ").join(",+");
      setSearchParams({ query: inputValue, page: 1 });
    }
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          name="search"
          placeholder={query}
        ></input>
        <button className="search-button">search</button>
      </form>
      <RecipeList recipeList={recipeList}></RecipeList>
    </>
  );
};

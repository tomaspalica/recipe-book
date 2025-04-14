import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchRecipesByIngredients } from "../apiFetch/Api";
import { RecipeList } from "./RecipeList";
export const IngredientForm = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  // in futer add a check of some sort for users to check if they want to ignore pantry items in their search or they want to include them
  useEffect(() => {
    if (query === "" || query === null) {
      setRecipeList([]);
      return;
    }
    console.log(1);
    const fetchData = async () => {
      try {
        const response = await fetchRecipesByIngredients(query);
        console.log(response);
        setRecipeList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.search.value.split(" ").join(",+");
    console.log(e.target.search.value.split(" ").join(","));
    setSearchParams({ query: inputValue });
    console.log(query);
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

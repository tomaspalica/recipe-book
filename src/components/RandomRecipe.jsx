import { useEffect, useState } from "react";
import { fetchRandomRecipes } from "../apiFetch/Api";
import { RecipeList } from "./RecipeList";
export const RandomRecipe = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [resetList, setResetList] = useState([false]);
  const fetchData = async () => {
    const response = await fetchRandomRecipes();
    console.log(response);
    setRecipeList(response.data.recipes);
  };
  useEffect(() => {
    fetchData();
  }, [resetList]);
  const handleClick = (e) => {
    setResetList([true]);
  };
  return (
    <div className="random-wrapper">
      <h2>Checkout these random recipes</h2>
      <button className="random-button" onClick={handleClick}>
        Rerender
      </button>
      <RecipeList recipeList={recipeList}></RecipeList>
    </div>
  );
};

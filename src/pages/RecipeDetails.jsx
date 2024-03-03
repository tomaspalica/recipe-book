import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipesDetails } from "../apiFetch/Api";

export const RecipeDetails = () => {
  const [recipe, setRecipe] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchRecipesDetails(id);
        console.log(response);
        setRecipe(response.data);
        console.log(recipe.analyzedInstructions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <h2>{recipe?.title}</h2>
      <ul>
        <li></li>
      </ul>
      <ul></ul>
    </main>
  );
};

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipesDetails } from "../apiFetch/Api";

export const RecipeDetails = () => {
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState();
  const { id } = useParams();
  let ourIngredients = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchRecipesDetails(id);
        console.log(response);
        setRecipe(response.data);
        const filteredIngredients = recipe?.analyzedInstructions.map((el) =>
          el.steps.map((el) => el.ingredients.map((el) => el.name))
        );
        console.log(filteredIngredients);
        setIngredients(ourIngredients);
        console.log(ingredients);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <h2>{recipe?.title}</h2>
      <ul></ul>

      {recipe?.analyzedInstructions?.map((el) => (
        <ul>
          <h3>{el.name}</h3>{" "}
          {el.steps.map((step) => (
            <li key={step.number}>
              {step.number}: {step.step}
            </li>
          ))}{" "}
        </ul>
      ))}
    </main>
  );
};

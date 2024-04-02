import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipesDetails } from "../apiFetch/Api";
import { nanoid } from "nanoid";
export const RecipeDetails = () => {
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState();
  const { id } = useParams();
  let ourIngredients = [];
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchRecipesDetails(id);
      setRecipe(response.data);
      const filteredIngredients =
        await response.data.extendedIngredients.filter((obj, index) => {
          return (
            recipe?.extendedIngredients.findIndex(
              (item) => item.id === obj.id
            ) === index
          );
        });
      console.log(filteredIngredients);
      if (filteredIngredients) {
        setIngredients(filteredIngredients);
      }
      console.log(ingredients);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <h2>{recipe?.title}</h2>
      <ul>
        {ingredients?.map((el) => (
          <li key={el.id}>{el.original}</li>
        ))}
      </ul>
      {recipe?.analyzedInstructions?.map((el) => (
        <ul key={nanoid()}>
          <h3>{el.name}</h3>{" "}
          {el.steps.map((step) => (
            <li key={nanoid()}>
              {step.number}: {step.step}
            </li>
          ))}{" "}
        </ul>
      ))}
    </main>
  );
};

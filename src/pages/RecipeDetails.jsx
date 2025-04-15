import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipesDetails } from "../apiFetch/Api";
import { nanoid } from "nanoid";
export const RecipeDetails = () => {
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState();
  const { id } = useParams();
  let ourIngredients = [];
  const fetchData = async () => {
    try {
      const response = await fetchRecipesDetails(id);
      setRecipe(response.data);
      console.log(response.data);
      const filteredIngredients =
        await response.data.extendedIngredients.filter((obj, index) => {
          return (
            response.data.extendedIngredients.findIndex(
              (item) => item.id === obj.id
            ) === index
          );
        });
      if (filteredIngredients) {
        setIngredients(filteredIngredients);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <h2>{recipe?.title}</h2>
      <h3>Health score: {recipe?.healthScore}</h3>

      <ul>
        <h3>Ingredients</h3>
        {ingredients?.map((el) => (
          <li key={el.id}>{el.original}</li>
        ))}
      </ul>
      {recipe?.analyzedInstructions?.map((el) => (
        <ul key={nanoid()}>
          <h3>{el.name !== "" ? el.name : "Recipe Instructions"}</h3>{" "}
          {el.steps.map((step) => (
            <li key={nanoid()}>
              {step.number}: {step.step}
            </li>
          ))}{" "}
        </ul>
      ))}
      <div dangerouslySetInnerHTML={{ __html: recipe?.summary }}></div>
    </main>
  );
};

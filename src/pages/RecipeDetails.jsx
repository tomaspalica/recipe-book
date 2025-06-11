import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecipesDetails } from "../apiFetch/Api";
import { nanoid } from "nanoid";
import { CommentForm } from "../components/ComentForm";
export const RecipeDetails = () => {
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState();
  const { id } = useParams();
  let ourIngredients = [];
  const fetchData = async () => {
    try {
      const response = await fetchRecipesDetails(id);
      console.log(response);

      setRecipe(response.data);
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
      <div>
        <h2>{recipe?.title}</h2>
        <h3>Health score: {recipe?.healthScore}</h3>
        <img src={recipe?.image} />
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul className="details-list">
          {ingredients?.map((el) => (
            <li key={el.id}>{el.original}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Recipe Instructions</h2>
        <ul>
          {recipe?.analyzedInstructions[0].steps.map((step) => (
            <li key={nanoid()}>
              {step.number}: {step.step}
            </li>
          ))}
        </ul>
      </div>
      <div dangerouslySetInnerHTML={{ __html: recipe?.summary }}></div>
      <CommentForm></CommentForm>
    </main>
  );
};

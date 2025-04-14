import axios from "axios";

const key = process.env.REACT_APP_API_KEY;
const edamamKey = process.env.REACT_APP_EDAMAM_KEY;
const edamamID = process.env.REACT_APP_EDAMAM_ID;
// axios.defaults.baseURL = "https://api.spoonacular.com";
export const fetchRecipes = async (meal) => {
  console.log(process.env);
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?query=${meal}&apiKey=${key}`
  );
  return response;
};

export const fetchRecipesDetails = async (id) => {
  const response = await axios.get(
    `http://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`
  );
  return response;
};

export const fetchRecipesByIngredients = async (ingredients, ignore = true) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&ignorePantry=${ignore}&apiKey=${key}`
  );
  return response;
};
export const fetchRandomRecipes = async (number = 6) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/random?number=${number}&apiKey=${key}`
  );
  return response;
};

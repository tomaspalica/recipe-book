import axios from "axios";

const key = process.env.REACT_APP_API_KEY;
const edamamKey = process.env.REACT_APP_EDAMAM_KEY;
const edamamID = process.env.REACT_APP_EDAMAM_ID;
// axios.defaults.baseURL = "https://api.spoonacular.com";
export const fetchRecipes = async (meal) => {
  console.log(process.env);
  const respone = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?query=${meal}&apiKey=${key}`
  );
  return respone;
};

export const fetchRecipesDetails = async (id) => {
  const respone = await axios.get(
    `http://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`
  );
  return respone;
};

export const fetchRecipesByIngredients = async (ingredients, ignore = true) => {
  const respone = await axios.get(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&ignorePantry=${ignore}&apiKey=${key}`
  );
  return respone;
};

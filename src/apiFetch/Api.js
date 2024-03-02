import axios from "axios";

const key = process.env.REACT_APP_API_KEY;
axios.defaults.baseURL = "https://api.spoonacular.com";
export const fetchRecipes = async (meal) => {
  console.log(process.env);
  const respone = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?query=${meal}&apiKey=${key}`
  );
  return respone;
};

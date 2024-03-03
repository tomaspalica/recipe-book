import axios from "axios";

const key = process.env.REACT_APP_API_KEY;
axios.defaults.baseURL = "https://api.spoonacular.com";
export const fetchRecipes = async (meal) => {
  console.log(process.env);
  const respone = await axios.get(
    `/recipes/complexSearch?query=${meal}&apiKey=${key}`
  );
  return respone;
};

export const fetchRecipesDetails = async (id) => {
  console.log(typeof id);
  const respone = await axios.get(
    `http://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`
  );
  return respone;
};

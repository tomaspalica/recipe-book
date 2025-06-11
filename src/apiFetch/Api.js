import axios from "axios";

const key = process.env.REACT_APP_API_KEY;
const edamamKey = process.env.REACT_APP_EDAMAM_KEY;
const edamamID = process.env.REACT_APP_EDAMAM_ID;
// axios.defaults.baseURL = "https://api.spoonacular.com";
export const fetchRecipes = async (meal, offset) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?query=${meal}&offset=${offset}&apiKey=${key}`
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
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=20&ignorePantry=${ignore}&apiKey=${key}`
  );
  return response;
};
export const fetchRandomRecipes = async (number = 6) => {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/random?number=${number}&apiKey=${key}`
  );
  return response;
};
const BASE_URL = "https://recipe-book-iota-flame.vercel.app";
export const moderateComment = async (comment) => {
  const res = await fetch(`${BASE_URL}/api/moderateComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });

  const data = await res.json();
  return data;
};

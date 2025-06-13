import axios from "axios";

import Groq from "groq-sdk";
const key = process.env.REACT_APP_API_KEY;
const grogKey = process.env.REACT_APP_GROG_KEY;

const groq = new Groq({ apiKey: grogKey, dangerouslyAllowBrowser: true });

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
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`
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
export async function getGroqChatCompletion(comment) {
  return await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `check comment for faul language if comment has faul language censore it and return it to me, dont type anything else then the censored comment and if you get a empty string or "" just return ""  : "${comment}" `,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}

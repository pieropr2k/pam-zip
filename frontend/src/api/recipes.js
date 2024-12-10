import axios from "./axios";

export const getRecipesRequest = async () => axios.get("/recipes");

export const getOneRecipeRequest = async (id) => axios.get(`/recipes/${id}`);

export const addRecipeRequest = async (recipe) => axios.post("/recipes", { recipe_id: recipe });

export const deleteRecipeRequest = async (id) => axios.delete(`/recipes/${id}`);

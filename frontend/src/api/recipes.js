import axios from "./axios.js";

export const getRecipesRequest = async (category) => {
    //console.log(category);
    return axios.get(`/recipesCategories/${category}`)
}; 

export const getOneRecipeRequest = async (id) => axios.get(`/recipes/${id}`);

export const getRecipeByNameRequest = async (name) => axios.get(`/recipeInfo/${name}`);
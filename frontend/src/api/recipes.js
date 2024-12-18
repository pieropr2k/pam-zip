import axios from "./axios";

export const getRecipesRequest = async (category) => {
    console.log(category);
    return axios.get(`/recipesCategories/${category}`)
}; 

export const getOneRecipeRequest = async (id) => axios.get(`/recipes/${id}`);

export const getRecipeByNameRequest = async (name) => axios.get(`/recipeInfo/${name}`);

//export const addRecipeRequest = async (recipe) => axios.post("/recipes", { recipe_id: recipe });
//export const deleteRecipeRequest = async (id) => axios.delete(`/recipes/${id}`);

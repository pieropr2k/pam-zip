import { createContext, useContext, useState } from "react";
import {
    getRecipesRequest,
    getOneRecipeRequest,
    getRecipeByNameRequest
} from "../api/recipes";

const RecipesContext = createContext();

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) throw new Error("useRecipes must be used within a RecipesProvider");
  return context;
};

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const getRecipesByCategory = async (category, recipesId = []) => {
    try {
      const res = await getRecipesRequest(category);
      const recipesList = res.data;
      //console.log(recipesList, "api recipes");
      setRecipes(recipesList);
      /*
        if (category !== 'All') {
            const res = await getRecipesRequest(category);
            const recipesList = res.data;
            //console.log(recipesList, "api recipes");
            setRecipes(recipesList);
        } else {
            const recipesList = await Promise.all(
                recipesId.map(async (id) => {
                     const res = await getOneRecipeRequest(id);
                     return res.data; 
                })
            );
            //console.log(recipesId, "prov ids")
            //console.log(recipesList, "prov")
            setRecipes(recipesList);
        }
      */
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }; 

  const getOneRecipe = async (id) => {
    try {
      const res = await getOneRecipeRequest(id);
      return res.data;
    } catch (error) {
      console.error("Error fetching recipe:", error);
      //throw error;
    }
  };

  const getRecipeByName = async (name) => {
    try {
      const res = await getRecipeByNameRequest(name);
      return res.data;
    } catch (error) {
      console.error("Error fetching recipe:", error);
      //throw error;
    }
  }; 

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        getRecipesByCategory,
        getOneRecipe,
        getRecipeByName
        //addRecipe,
        //deleteRecipe,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
}

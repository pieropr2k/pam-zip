import { createContext, useContext, useState } from "react";
import {
  addFavoriteRequest,
  deleteFavoriteRequest,
  getFavoritesRequest
} from "../api/favorites";
import { getOneRecipeRequest } from "../api/recipes";

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within a FavoriteProvider");
  return context;
};

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      const res = await getFavoritesRequest();
      
      const favoritesList = res.data
      //.map(async (favorite) => await getOneRecipeRequest(favorite));
      console.log(favoritesList, "api favs");
      /*
      console.log(await Promise.all(favoritesID.map(async (favorite) => {
        const recipe = await getOneRecipeRequest(favorite)
        return recipe.data
    })));
    */
      setFavorites(favoritesList);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const deleteFavorite = async (id) => {
    try {
      const res = await deleteFavoriteRequest(id);
      if (res.status === 204 || res.status === 200) {
        setFavorites(favorites.filter((favorite) => favorite.id !== id));
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  const addFavorite = async (favorite) => {
    console.log(favorite)
    try {
      const res = await addFavoriteRequest(favorite);
      console.log("Favorite created:", res.data);
      // Optionally add the new favorite to the state
      setFavorites((prevFavorites) => [...prevFavorites, res.data]);
    } catch (error) {
      console.error("Error creating favorite:", error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        getFavorites,
        deleteFavorite,
        addFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

import { getRecipeInfo } from '../middlewares/getRecipe.middleware.js';
import FavoriteRecipesModel from '../models/favorites.model.js';

export const createFavoriteRecipe = async (req, res) => {
    const {recipe_id} = req.body;
    //const favoriteRecipe = req.body;
    //console.log({ recipe_id: recipe_id, user_id: req.user.id })
    try {
        const formattedFavorite = { recipe_id: recipe_id, user_id: req.user.id };
        console.log(formattedFavorite);
        //const formattedFavorite = { ...favoriteRecipe, user_id: req.user.id }; // Suponiendo que el `user_id` viene del token del usuario
        await FavoriteRecipesModel.create(formattedFavorite);
        const fav_info = await getRecipeInfo(recipe_id);
        if (fav_info) {
            return res.status(401).json({ message: "No meal found with the given ID"});
        }
        //console.log(fav_info, "fav info endpoint")
        res.status(201).json(fav_info);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const getAllFavoriteRecipes = async (req, res) => {
    try {
        const rows = await FavoriteRecipesModel.findAll({
            where: { user_id: req.user.id }, // Filtra por usuario autenticado
            attributes: ['id', 'user_id', 'recipe_id'], // Selecciona columnas específicas
        });
        // Mapea las recetas favoritas y resuelve todas las promesas con Promise.all
        const favoriteRecipesJson = await Promise.all(
            rows.map(async (recipe) => {
                return await getRecipeInfo(recipe.recipe_id);
            })
        );
        console.log(favoriteRecipesJson, "json")
        //const favoriteRecipes = rows.map(row => row.recipe_id)

        res.json(favoriteRecipesJson);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const getFavoriteRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const favorite = await FavoriteRecipesModel.findOne({
            where: {
                id,
                user_id: req.user.id,
            },
        });

        if (!favorite) return res.status(404).json({ error: "Favorite recipe not found" });

        res.json(favorite);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const deleteFavoriteRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await FavoriteRecipesModel.destroy({
            where: {
                recipe_id: id,
                user_id: req.user.id,
            },
        });

        if (deletedRows === 0) return res.status(404).json({ error: "Favorite recipe not found" });

        res.json({ message: "Favorite recipe deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

import { Router } from "express"
import { getAllInfo, getCategory, getRecipeInfo, getRecipeInfoById } from "../controllers/recipes.controller.js"

const router = Router()

router.get("/",(req,res)=>{
    res.send("Testing")
})

router.get("/recipesCategories/:category", getCategory)

router.get("/recipeInfo/:name",getRecipeInfo)

router.get("/recipes/:id", getRecipeInfoById)

router.get("/allInfo/:nameRecipe", getAllInfo)

export default router
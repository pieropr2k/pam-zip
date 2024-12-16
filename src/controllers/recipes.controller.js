import axios from 'axios';

export const getInfoById = async (req, res) => {
    const { id } = req.params;
    try {
        //const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        
        const meal = response.data.meals[0];
        //console.log(response.data);
        const {strArea, strMeal, strMealThumb, strInstructions, strYoutube} = meal; 
        if (!meal) {
            return res.status(400).json({ error: "Recipe not found" });
        }
        const ingredients = []
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`]
                const measure = meal[`strMeasure${i}`]
                if (ingredient && ingredient.trim() !== "") {
                    ingredients.push({
                        ingredient: ingredient.trim(),
                        measure: measure ? measure.trim() : "",
                    })
                }
            }
            
        //console.log({ id, name: strMeal, area: strArea, img: strMealThumb, ingredients, instructions: strInstructions, ytLink: strYoutube })
        res.json({ id, name: strMeal, area: strArea, img: strMealThumb, ingredients, instructions: strInstructions, ytLink: strYoutube });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


export const getRecipeByName = async(req,res) => {
    const {name} = req.params
    
    try {
        const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        const data = await request.json()

        if (!data.meals || data.meals.length === 0) {
            return res.status(401).json({ message: "No meal found with the given ID"});
        } 
        const { strMeal, strMealThumb } = data.meals[0]
        return res.json({ strMeal, strMealThumb })

    }catch(error){
        console.log(error)
    }

}

/*
export const getAllInfo = async (req, res) => {
    const { nameRecipe } = req.params

    try {
        const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameRecipe}`)
        const data = await request.json()

            const meal = data.meals[0]
      
            const ingredients = []
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`]
                const measure = meal[`strMeasure${i}`]
                if (ingredient && ingredient.trim() !== "") {
                    ingredients.push({
                        ingredient: ingredient.trim(),
                        measure: measure ? measure.trim() : "",
                    })
                }
            }
            const img = meal['strMealThumb']

            const response = {
                instructions: meal.strInstructions,
                youtubeLink: meal.strYoutube,
                ingredients,
                img: img
            }

           res.json(response)
      
    } catch (error) {
        console.error(error)
    }
}
*/

export const getCategory = async (req, res) => {
    const {category} = req.params

    try {
        const response = await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        const data = await response.json()

        const recipes = data.meals.map((meal) => {
            return {
                id: meal.idMeal,
                name: meal.strMeal,
                img: meal.strMealThumb
            }
        })
        // console.log(data.meals[0].strMeal,data.meals[0].strMealThumb)
        res.json(recipes)

    } catch (error) {
        console.error(error)
    }
}
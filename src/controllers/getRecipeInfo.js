/*
export const getRecipeInfo = async(req,res) => {
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
*/
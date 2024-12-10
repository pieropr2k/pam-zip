export const getRecipeInfo = async (id) => {

    try {
        const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await request.json()
        //console.log(data)
        if (!data.meals || data.meals.length === 0) {
            return null;
            //res.status(401).json({ message: "No meal found with the given ID"});
        }

        const { idMeal, strMeal, strMealThumb } = data.meals[0]
        return { id: idMeal, strMeal, strMealThumb };

    }catch(error){
        console.log(error)
    }

}


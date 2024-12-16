/*
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../css/components-css/RecipeCard.css"
import { useRecipes } from '../context/RecipesContext'

const RecipeCard = ({id}) => {
  const [recipes, setRecipes] = useState({
    name: '',
    img: ''
  })
  const {getOneRecipe} = useRecipes();

  const getRecipesInfo = async () => {

    //

try {
      const res = await fetch(`http://localhost:4000/api/recipeInfo/${name}`)
      const data = await res.json()
      const {strMeal, strMealThumb} = data
      setRecipes({
        name: strMeal,
        img: strMealThumb
      })

    } catch (error) {
      console.error(error)
    }
    //


    const recipe = await getOneRecipe(id);
    const {img, name} = recipe;
    //const {strMeal, strMealThumb} = recipe;
    console.log(recipe);
    setRecipes({
      img,
      name
      //name: strMeal,
      //img: strMealThumb
    });
    
  }

  useEffect(() => {
    getRecipesInfo()
  }, [])

  return (
    <div className='card-container'>
        <div className='header-card'>
            <p>{recipes.name}</p>
            <Link to={`/recipe/${recipes.name}`}>
              <button>view</button>
            </Link>
        </div>

        <img src={recipes.img} alt="" />
        <button onClick={null}>Add to Favorites</button>
    </div>
  )
}

export default RecipeCard
*/

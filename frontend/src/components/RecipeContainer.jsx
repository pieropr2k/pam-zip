import { useState, useEffect, useContext } from 'react'
import RecipeCard from "./RecipeCard"
//import SearchCard from "./SearchCard"
import "../css/components-css/RecipeContainer.css" 
import { useRecipes } from '../context/RecipesContext'
import AppContext from './context/AppContext'

const RecipeContainer = ({ recipeSearch = '', CategorySelected, setCategorySelected  }) => {
    const [recipesSearched, setRecipesSearched] = useState({
        name: '',
        img: ''
    })
    const { isMenu, setIsMenu } = useContext(AppContext)
 
    const [recipesId, setRecipesId] = useState([]);
    const { recipes, getRecipesByCategory, getRecipeByName }= useRecipes(); 

    useEffect(() => {
        if (isMenu) {
            setIsMenu(true)
        }
        if (recipeSearch === '') {
            setRecipesSearched({
                name: '',
                img: ''
            });
            setRecipesId([]);
        } else { 
            const getRecipeSearched = async () => {
                const recipe = await getRecipeByName(recipeSearch);
                const { strMeal, strMealThumb } = recipe;
                    setRecipesSearched({ 
                        name: strMeal,
                        img: strMealThumb
                    });
            } 

            const handleEnter = (e) => {
                if (e.key === 'Enter') {
                    getRecipeSearched() 
                }
            }

            window.addEventListener('keydown', handleEnter)

            return () => {
                window.removeEventListener('keydown', handleEnter)
            }
        }

    }, [recipeSearch]);

    useEffect(() => {
        getRecipesByCategory(CategorySelected, recipesId);
    }, [CategorySelected, recipesId]); 
    
    useEffect(() => {
        if (recipeSearch === '' && CategorySelected === 'All') {
            const recipesIdList = ['52978', '53049', '53071', '52855', '52776', '52785', '52907', '52791', '52802'];
            setRecipesId(recipesIdList);
        } else {
            setRecipesId([]);
        }
    }, [recipeSearch, CategorySelected]); 

    //Return Render
    if (recipeSearch === '' && CategorySelected === 'All') {
        //const NameRecipes = ['Kumpir', 'apam', 'asado', 'banana', 'gateau', 'fry', 'confit', 'eton', 'fish pie'] 
        return (
            <main className='recipes-container'>
                {
                //recipesId.map((name, index) => (
                recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                    />
                ))}
            </main>
        )
    } else if (recipeSearch !== '') { 
        setCategorySelected('All'); 
        return (
            <main className='recipes-container'> 
                <RecipeCard recipe={recipesSearched}/> 
            </main>
        )
    }else { 
        return (
            <main className='recipes-container'>
                {recipes.map((o, index) => ( 
                    <RecipeCard key={index} recipe={o}/> 
                ))}
            </main>
        )
    }
}

export default RecipeContainer;
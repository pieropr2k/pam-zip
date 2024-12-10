import { useState, useEffect } from 'react'
import RecipeCard from "./RecipeCard"
import SearchCard from "./SearchCard"
import "../css/components-css/RecipeContainer.css"

const RecipeContainer = ({ recipeSearch = '', CategorySelected, setCategorySelected  }) => {
    const [recipesSearched, setRecipesSearched] = useState({
        name: '',
        img: ''
    })

    const [recipesByCategory,setRecipesByCategory] = useState([])
    
    // console.log(CategorySelected)

    useEffect(() => {
        if (recipeSearch === '') {
            setRecipesSearched({
                name: '',
                img: ''
            })
        } else {
            const getRecipeSearched = async () => {
                try {
                    const res = await fetch(`http://localhost:4000/api/recipeInfo/${recipeSearch}`)
                    const data = await res.json()
                    const { id, strMeal, strMealThumb } = data
                    setRecipesSearched({
                        id,
                        name: strMeal,
                        img: strMealThumb
                    })
                } catch (error) {
                    console.error(error)
                }
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



    }, [recipeSearch])


    useEffect(() => {
        if(CategorySelected !== 'All'){
            const getRecipesByCategorie = async () => {
                try {
                    const res = await fetch(`http://localhost:4000/api/recipesCategories/${CategorySelected}`)
                    const data = await res.json()
                    // recipesByCategory = data
                    setRecipesByCategory(data)
                    
                    
                } catch (error) {
                    console.error(error)
                }
                
            }
            getRecipesByCategorie()
        }
        
    }, [CategorySelected])
    

    //Return Render
    if (recipeSearch === '' && CategorySelected === 'All') {
        const NameRecipes = ['Kumpir', 'apam', 'asado', 'banana', 'gateau', 'fry', 'confit', 'eton', 'fish pie']
        
        return (
            <main className='recipes-container'>
                {NameRecipes.map((name, index) => (
                    <RecipeCard
                        key={index}
                        name={name}
                    />
                ))}
            </main>
        )
    } else if (recipeSearch !== ''){
        
        setCategorySelected('All')

        return (
            <main className='recipes-container'>
                <SearchCard
                    name={recipesSearched.name}
                    img={recipesSearched.img}
                    id={recipesSearched.id}
                />
            </main>
        )
    }else {
        return (
            <main className='recipes-container'>
                {recipesByCategory.map((o, index) => (
                    <SearchCard
                        key={index}
                        name={o.name}
                        img={o.img}
                        id={o.id}
                    />
                ))}
            </main>
        )
    }
}

export default RecipeContainer



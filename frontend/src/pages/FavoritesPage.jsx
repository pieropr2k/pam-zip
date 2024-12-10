import React, { useState, useEffect } from 'react';
//import RecipeCard from './RecipeCard';
import '../css/components-css/RecipeContainer.css';
import '../css/components-css/Search.css';
import { useFavorites } from '../context/FavoritesContext';
import SearchCard from '../components/SearchCard';

const FavoritesPage = () => {
    const { getFavorites, favorites } = useFavorites();

    useEffect(() => {
        getFavorites();
    });
    console.log(favorites);

    return (
        <>
            <main className='recipes-container'>
                <h1>Favorites:</h1>
                {favorites ? (
                    favorites.map((recipe, index) => (
                        <SearchCard
                            key={index}
                            recipe={recipe}
                            id={recipe.id}
                            name={recipe.strMeal}
                            img={recipe.strMealThumb}
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </main>
        </>
    );
};

export default FavoritesPage;

import { useContext, useEffect } from 'react';
import '../css/components-css/RecipeContainer.css';
import '../css/components-css/Search.css';
import { useFavorites } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';
import AppContext from '../components/context/AppContext';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
    const { getFavorites, favorites } = useFavorites();
    const { isMenu, setIsMenu } = useContext(AppContext)

    useEffect(() => {
        if (isMenu) {
            setIsMenu(false)
        }
        getFavorites();
    }, []);

    return (
        <>
            <p>
                <Link to="/" className="back-link">
                    Volver
                </Link>
            </p> 
            <h1>Mis Favoritos:</h1>
            <main className='recipes-container'>
                {favorites.length === 0 
                ? <p>No hay favoritos en tu lista, agrega unos...</p>
                : (
                    favorites.map((recipe, index) => (
                        <RecipeCard
                            key={index}
                            recipe={recipe}
                        />
                    ))
                )}
            </main>
        </>
    );
};

export default FavoritesPage;

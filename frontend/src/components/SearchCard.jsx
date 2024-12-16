/*
import { Link } from 'react-router-dom'
import "../css/components-css/RecipeCard.css"
import { useFavorites } from '../context/FavoritesContext'

const RecipeSearch = ({id, name, img}) => {

  const {favorites, addFavorite, deleteFavorite} = useFavorites();
  //console.log(favorites);
  const favoritesId = favorites.map(recipe=>recipe.id);
  //console.log(favoritesId);



  const handleAddFavorite = () => {
    console.log(id);
    console.log(favoritesId.includes(id))
    console.log(favoritesId)
    if (favoritesId.includes(id)) {
      deleteFavorite(id); 
    } else {
      addFavorite(id);
    }
  }

  return (
    <div className='card-container'>
        <div className='header-card'>
            <p>{name}</p>
            <Link to={`/recipe/${name}`}>
              <button>view</button>
            </Link>
        </div>

        <img src={img} alt="" />
        <button onClick={handleAddFavorite}>{!favoritesId.includes(id) ? "Add to Favorites" : "Delete from Favorites"}</button>
        
    </div>
  )
}

export default RecipeSearch
*/
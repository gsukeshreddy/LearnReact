import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Favorites() {
  const { favorites } = useFavorites();
  const query: string = useQuery().get('searchTerm') || '';  

  return (
    <div className="container mt-4">
      <h2>{favorites.length > 0 ? "Your Favorites" : "No Favorite Movies"}</h2>
      <div className="container">
            <div className="row">
                {favorites.length > 0 && query ? 
                favorites.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())).map(movie => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={movie.id}>
                        <MovieCard movie={movie} />
                    </div>
                )) :
                favorites.map(movie => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={movie.id}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
      </div>
      </div>
    </div>
  );
}

export default Favorites;
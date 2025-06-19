import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../models/Movie";
import { getPopularMovies, searchMovies } from "../services/movies-api";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
    const query: string = useQuery().get('searchTerm') || '';
    const [movieList, setMovies] = useState<Movie[]>([]); 
    const [error, setError] = useState<string>(''); 
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        const loadPopularMovies = async () => {
      try {
        const results = query ? await searchMovies(query) 
                                : await getPopularMovies();
        setMovies(results);
        console.log(results);
      } catch (err) {
        console.log(err);
        setError(`Failed to load movies...`);
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
    }, [query]);

    return (
        <>
        {error && <div className="error-message">{error}</div>}

         {loading ? (
        <Loader />
      ) : (
        <div className="container">
            <div className="row">
                {movieList.map((movie: Movie) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={movie.id}>
                    <MovieCard movie={movie} />
                </div>
                ))}
            </div>
        </div>
      )}
      </>
    );
}

export default Home;
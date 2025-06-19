import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../models/Movie";
import { getPopularMovies } from "../services/movies-api";

function Home() {
    const [movieList, setMovies] = useState<Movie[]>([]); 
    const [error, setError] = useState<string>(''); 
    const [loading, setLoading] = useState<boolean>(true); 

    useEffect(() => {
        const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        console.log(popularMovies);
      } catch (err) {
        console.log(err);
        setError(`Failed to load movies...`);
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
    }, []);

    return (
        <>
        {error && <div className="error-message">{error}</div>}

         {loading ? (
        <div className="loading">Loading...</div>
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
import Card from 'react-bootstrap/Card';
import type { Movie } from '../models/Movie';
import '../assets/css/MovieCard.css';
import { useFavorites } from '../context/FavoritesContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Props {
    movie : Movie
}

function MovieCard({movie} : Props) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const toggleFavorite = () => {
        if (isFavorite(movie.id)) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
        };    

    return (
    <Card style={{ width: '18rem', height: '36.5rem', display: 'flex', flexDirection: 'column' }}>
      <Card.Img
        variant="top"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Image'
        }
        style={{ height: '25rem', objectFit: 'cover' }}
      />

      <Card.Body style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
    <Card.Title>{movie.title}</Card.Title>

        <Card.Text className='movie-card__overview' title={movie.overview}>{movie.overview}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <span>Release: {movie.release_date || 'N/A'}</span>
        <i onClick={toggleFavorite}
        style={{ cursor: 'pointer', color: isFavorite(movie.id) ? 'red' : 'black' }}
        >
        {isFavorite(movie.id) ? <FaHeart /> : <FaRegHeart />}
        </i>
      </Card.Footer>
    </Card>
  );
}

export default MovieCard;
import Card from 'react-bootstrap/Card';
import type { Movie } from '../models/Movie';
import '../assets/css/MovieCard.css';

interface Props {
    movie : Movie
}

function MovieCard({movie} : Props) {

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
      <Card.Footer style={{ fontSize: '0.85rem' }}>
        Release Date: {movie.release_date || 'Not Specified'}
      </Card.Footer>
    </Card>
  );
}

export default MovieCard;
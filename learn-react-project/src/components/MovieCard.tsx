import Card from 'react-bootstrap/Card';
import type { Movie } from '../models/Movie';
import '../assets/css/MovieCard.css';

interface Props {
    movie : Movie
}

function MovieCard({movie} : Props) {
    return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text className="movie-card__overview" title={movie.overview}>
          {movie.overview}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        Release Date: {movie.release_date}
      </Card.Footer>
    </Card>
    );
}

export default MovieCard;
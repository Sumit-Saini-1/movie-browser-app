import { Link } from 'react-router-dom'
import styles from "./style.module.css";
import { Movie } from '../../types/movie'

interface MovieCardProps {
    movie: Movie
    isFavorite: boolean
    onToggleFavorite: (movie: Movie) => void
}

const MovieCard = ({ movie, isFavorite, onToggleFavorite }: MovieCardProps) => {
    return (
        <div className={styles.card}>
            <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
                alt={movie.Title}
                className={styles.poster}
            />
            <div className={styles.details}>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                <div className={styles.actions}>
                    <Link to={`/detail?id=${movie.imdbID}`} className={styles.infoButton}>
                        More Info
                    </Link>
                    <button
                        className={styles.favButton}
                        onClick={() => onToggleFavorite(movie)}
                        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    >
                        {isFavorite ? '💔' : '♥'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MovieCard

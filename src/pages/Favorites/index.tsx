import { useEffect, useState } from 'react';
import styles from './style.module.css'
import { Movie } from '../../types/movie';
import MovieCard from '../../components/MovieCard';

const Favorites = () => {
    const [favorites, setFavorites] = useState<Movie[]>([])

    useEffect(() => {
        const stored = localStorage.getItem('favorites')
        if (stored) {
            setFavorites(JSON.parse(stored))
        }
    }, [])

    const handleToggleFavorite = (movie: Movie) => {
        const updated = favorites.filter((fav) => fav.imdbID !== movie.imdbID)
        setFavorites(updated)
        localStorage.setItem('favorites', JSON.stringify(updated))
    }

    return (
        <div className={styles.container}>
            <h2>Your Favorite Movies</h2>
            {favorites.length === 0 ? (
                <p>No favorites yet.</p>
            ) : (
                <div className={styles.grid}>
                    {favorites.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            isFavorite={true}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favorites

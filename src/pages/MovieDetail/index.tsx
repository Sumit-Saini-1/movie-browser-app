import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import styles from './style.module.css'
import { MovieDetail as IMovieDetail } from '../../types/movie'
import { getMovieById } from '../../services/omdbApi'
import Loader from '../../components/Loader'

const MovieDetail = () => {
    const [searchParams] = useSearchParams()
    const imdbID = searchParams.get('id')
    const [movie, setMovie] = useState<IMovieDetail | null>(null)

    useEffect(() => {
        if (imdbID) {
            getMovieById(imdbID).then(setMovie)
        }
    }, [imdbID])

    if (!movie) return <Loader/>

    return (
        <div className={styles.container}>
            <Link to="/" className={styles.backLink}>← Back to Search</Link>
            <div className={styles.details}>
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.png'}
                    alt={movie.Title}
                    className={styles.poster}
                />
                <div className={styles.info}>
                    <h1>{movie.Title}</h1>
                    <p><strong>Genre:</strong> {movie.Genre}</p>
                    <p><strong>Director:</strong> {movie.Director}</p>
                    <p><strong>Plot:</strong> {movie.Plot}</p>
                    <p><strong>Ratings:</strong></p>
                    <ul>
                        {movie.Ratings?.map((r, i) => (
                            <li key={i}>
                                {r.Source}: {r.Value}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail

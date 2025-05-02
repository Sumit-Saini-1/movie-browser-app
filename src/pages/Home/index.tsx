import { useCallback, useEffect, useState } from 'react'
import styles from "./style.module.css";
import { Movie } from '../../types/movie';
import { searchMovies } from '../../services/omdbApi';
import SearchBar from '../../components/SearchBar';
import MovieCard from '../../components/MovieCard';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';


const Home = () => {
    const [query, setQuery] = useState<string>('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalResults, setTotalResults] = useState<number>(0)


    useEffect(() => {
        const favs = localStorage.getItem('favorites')
        if (favs) {
            setFavorites(JSON.parse(favs))
        }
    }, [])

    const handleSearch = useCallback(async (q: string, page = 1) => {
        setQuery(q)
        setCurrentPage(page)
        setIsLoading(true)
        const { Search = [], totalResults = "0" } = await searchMovies(q, page)
        setMovies(Search)
        setTotalResults(Number(totalResults))
        setIsLoading(false)
    }, [])

    const isFavorite = useCallback((movie: Movie) =>
        favorites.some((fav) => fav.imdbID === movie.imdbID),
        [favorites])

    const toggleFavorite = useCallback((movie: Movie) => {
        let updatedFavs: Movie[]
        if (isFavorite(movie)) {
            updatedFavs = favorites.filter((fav) => fav.imdbID !== movie.imdbID)
        } else {
            updatedFavs = [...favorites, movie]
        }
        setFavorites(updatedFavs)
        localStorage.setItem('favorites', JSON.stringify(updatedFavs))
    }, [favorites, isFavorite])

    return (
        <div className={styles.container}>
            <SearchBar onSearch={handleSearch} />
            {
                isLoading ?
                    <Loader /> :
                    <div className={styles.grid}>
                        {movies.length === 0 && query && <p>No results found.</p>}
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                                isFavorite={isFavorite(movie)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </div>
            }
            {!isLoading && totalResults > 10 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(totalResults / 10)}
                    onPageChange={(page) => handleSearch(query, page)}
                />
            )}
        </div>
    )
}

export default Home

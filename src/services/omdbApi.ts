const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'https://www.omdbapi.com/'

// services/omdbApi.ts
export const searchMovies = async (query: string, page = 1) => {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`)
    return await response.json()
}


export const getMovieById = async (id: string) => {
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`)
    const data = await res.json()
    return data
}

export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
}

export interface MovieDetail extends Movie {
    Genre: string;
    Director: string;
    Plot: string;
    Ratings: { Source: string; Value: string }[];
}

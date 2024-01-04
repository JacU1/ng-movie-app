export interface MovieApiResponse {
    Title: string,
    Year: string,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Country: string,
    Awards: string,
    Poster: string,
    Ratings: [],
    Metascore: string,
    imdbRating: string,
    imdbVotes: string,
    imdbID: string,
    Type: string,
    DVD: string,
    BoxOffice: string,
    Production: string,
    Website: string,
    Response: string
}

export interface MovieApiSearch {
    Search: [
            {
                Title: string,
                Year: string,
                imdbID: string,
                Type: string,
                Poster: string
            }
        ],
        totalResults: string,
        Response: string
}
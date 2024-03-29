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
    Language?: string,
    Awards: string,
    Poster: string,
    Ratings: any[],
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

export interface SearchItem {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string  
}

export interface MovieApiSearch {
    Search: SearchItem[],
        totalResults: string,
        Response: string,
        Error?: string
}
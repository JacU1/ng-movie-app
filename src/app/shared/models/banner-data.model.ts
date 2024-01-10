import { MovieApiResponse, MovieApiSearch, SearchItem } from "./movies-api.model";

export interface BannerItem extends SearchItem {
    category: AWARD_CATEGORY
}

export enum AWARD_CATEGORY {
    BEST_MOVIE = 'BEST MOVIE',
    BEST_COSTUMES = 'BEST COSTUMES',
    BEST_EFFECTS = 'BEST EFFECTS'
}

export const BANER_DATA: BannerItem[] = [
    {
        Title: "Everything Everywhere All at Once",
        Year: "2022",
        imdbID: "tt6710474",
        Type: "movie",
        Poster: "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_SX300.jpg",
        category: AWARD_CATEGORY.BEST_MOVIE
    },
    {
        Poster: "https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
        Title: "Black Panther: Wakanda Forever",
        Type: "movie",
        Year: "2022",
        imdbID: "tt9114286",
        category: AWARD_CATEGORY.BEST_COSTUMES
    },
    {
        Poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg",
        Title: "Avatar: The Way of Water",
        Type: "movie",
        Year: "2022",
        imdbID: "tt1630029",
        category: AWARD_CATEGORY.BEST_EFFECTS
    }
]
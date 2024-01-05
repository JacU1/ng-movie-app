import { Selector } from "@ngxs/store";
import { MovieStateModel, MoviesState } from "../movie.state";
 
export class MoviesSelector {
  @Selector([MoviesState])
  static items(state: MovieStateModel) {
    return state.items;
  }
}
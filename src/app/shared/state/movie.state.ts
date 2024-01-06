
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AddMovie } from "./actions/movies.actions";
 
export interface MovieStateItem {
    id: string;
    title: string;
    poster: string;
  }
  
  export interface MovieStateModel {
      items: MovieStateItem[];
  }

@State<MovieStateModel>({
  name: "movies",
  defaults: {
    items: [],
  },
})

@Injectable()
export class MoviesState {
    @Action(AddMovie)
    addMovie(ctx: StateContext<MovieStateModel>, action: AddMovie) {
            const state = ctx.getState();
            const newItem: MovieStateItem = {
                id: action.id,
                title: action.title,
                poster: action.poster,
            };
        
            ctx.setState({
            ...state,
            items: [...state.items, newItem],
        });
    }
}
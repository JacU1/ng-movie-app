import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, switchMap } from 'rxjs';
import { MovieApiResponse } from 'src/app/shared/models/movies-api.model';
import { MoviesDataService } from 'src/app/shared/services/movies-data.service';
import { MovieStateItem } from 'src/app/shared/state';
import { AddMovie } from 'src/app/shared/state/actions/movies.actions';
import { MoviesSelector } from 'src/app/shared/state/selectors/movies.selectors';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss'
})
export class MoviePageComponent implements OnInit, OnDestroy {

  public movieData$!: Observable<MovieApiResponse>;
  
  private _sub: Subscription = new Subscription();

  constructor(private readonly _moviesService: MoviesDataService, 
    private readonly _activedRoute: ActivatedRoute,
    private readonly _store: Store) {}

  ngOnInit(): void {
    this.movieData$ = this._activedRoute.params.pipe(switchMap(res => {
      return this._moviesService.getMovieById(res['id']);
    }));

    this._sub.add(this.movieData$.subscribe(res => {
      this._store.dispatch(new AddMovie(res.Title, res.Poster, res.imdbID));
    }));
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}

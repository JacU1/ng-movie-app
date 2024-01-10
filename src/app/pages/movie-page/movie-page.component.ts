import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subscription, switchMap } from 'rxjs';
import { MovieApiResponse } from 'src/app/shared/models/movies-api.model';
import { MoviesDataService } from 'src/app/shared/services/movies-data.service';
import { AddMovie } from 'src/app/shared/state/actions/movies.actions';
import {
  initTE,
  Select
} from "tw-elements";

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss'
})
export class MoviePageComponent implements OnInit, OnDestroy {

  public movieData$!: Observable<MovieApiResponse>;
  
  private _sub: Subscription = new Subscription();

  constructor(private readonly _moviesService: MoviesDataService, 
    private readonly _activedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _store: Store) {}

    get getCurrentPage() : string {
      return localStorage.getItem('currentPage')!.toString()
    }

  ngOnInit(): void {
    initTE({ Select });

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

  returnToList(): void {
    if(localStorage.getItem('currentPage')){
      this._router.navigate(['/movies/page/' + this.getCurrentPage]);  
    }else {
      this._router.navigate(['/']);
    }
  }
}

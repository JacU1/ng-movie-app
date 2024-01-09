import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesDataService } from 'src/app/shared/services/movies-data.service';
import { MovieListComponent, PagingConfig } from './smart-components/movie-list/movie-list.component';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MovieApiSearch } from 'src/app/shared/models/movies-api.model';
import { Select } from '@ngxs/store';
import { MoviesSelector } from 'src/app/shared/state/selectors/movies.selectors';
import { MovieStateItem } from 'src/app/shared/state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MovieListComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {
  @Select(MoviesSelector.items)
  items$!: Observable<MovieStateItem[]>;

  public movieListSubject$!: Observable<MovieApiSearch | null>;
  private sub: Subscription = new Subscription();
  
  constructor(private readonly _movieService: MoviesDataService, private readonly _activatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    this.movieListSubject$ = this._movieService.movieDataList$.asObservable();

    this.sub.add(this._activatedRoute.params.subscribe(res => {
      res['id'] ? this.onPageChage(res['id']) : null;
    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onPageChage(page: any): void {
    localStorage.setItem('currentPage', page);
    if(localStorage.getItem('lastSelectedMovie')) {
      this.sub.add(this._movieService.getMovieBySearch(localStorage.getItem('lastSelectedMovie')!, page).subscribe(res => {
        this._movieService.movieDataList$.next(res);
      }));
    } else {
      this.sub.add(this._movieService.getMovieBySearch(this._movieService.searchedMovieTitle, page).subscribe(res => {
        this._movieService.movieDataList$.next(res);
      }));
    }
  }
}

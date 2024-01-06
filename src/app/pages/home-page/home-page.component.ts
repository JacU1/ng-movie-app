import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesDataService } from 'src/app/shared/services/movies-data.service';
import { MovieListComponent } from './dumb-components/movie-list/movie-list.component';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MovieApiSearch } from 'src/app/shared/models/movies-api.model';
import { Select } from '@ngxs/store';
import { MoviesSelector } from 'src/app/shared/state/selectors/movies.selectors';
import { MovieStateItem } from 'src/app/shared/state';

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
  
  constructor(private readonly _movieService: MoviesDataService){}

  ngOnInit(): void {
    this.movieListSubject$ = this._movieService.movieDataList$.asObservable();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onPageChage(page: any): void {
    this.sub.add(this._movieService.getMovieByTitleSearch(this._movieService.searchedMovieTitle, page).subscribe(res => {
      this._movieService.movieDataList$.next(res);
    }));
  }
}

import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MoviesDataService } from 'src/app/shared/services/movies-data.service';
import { MovieListComponent } from './dumb-components/movie-list/movie-list.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MovieApiSearch } from 'src/app/shared/models/movies-api.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MovieListComponent, CommonModule],
  providers: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  public movieListSubject$!: Observable<MovieApiSearch | null>;

  constructor(private readonly _movieService: MoviesDataService){}

  ngOnInit(): void {
    this.movieListSubject$ = this._movieService.movieDataList$.asObservable();
  }
}

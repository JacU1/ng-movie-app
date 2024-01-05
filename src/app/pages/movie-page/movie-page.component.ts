import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { MovieApiResponse } from 'src/app/shared/models/movies-api.model';
import { MoviesDataService } from 'src/app/shared/services/movies-data.service';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss'
})
export class MoviePageComponent implements OnInit {
  
  public movieData$!: Observable<MovieApiResponse>;

  constructor(private readonly _moviesService: MoviesDataService, private readonly _activedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.movieData$ = this._activedRoute.params.pipe(switchMap(res => {
      return this._moviesService.getMovieById(res['id']);
    }));
  }
}

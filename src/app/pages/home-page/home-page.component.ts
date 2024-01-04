import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MoviesDataService } from 'src/app/shared/services/movies-data.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  providers: [MoviesDataService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  constructor(private readonly _movieService: MoviesDataService){}

  ngOnInit(): void {
    this._movieService.getMovieByTitle("Django Unchained").subscribe(res => console.log(res.Title));
  }
}

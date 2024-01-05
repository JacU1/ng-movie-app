import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Collapse,
  initTE,
  Ripple
} from "tw-elements";
import { MoviesDataService } from '../../services/movies-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  public searchInput: FormControl;
  private sub!: Subscription;

  constructor(private readonly _moviesService: MoviesDataService){
    this.searchInput = new FormControl('');
    this.sub = new Subscription();
  }

  ngOnInit(): void {
    initTE({ Collapse, Ripple });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getMovieBySearch(): void {
    this.sub.add(this._moviesService.getMovieByTitleSearch(this.searchInput.value).subscribe(res => {
      this._moviesService.movieDataList$.next(res);
    }));
  }

  clearInput(): void {
    this.searchInput.reset();
    this._moviesService.movieDataList$.next(null);
  }

}
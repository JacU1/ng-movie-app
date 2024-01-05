import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { MoviesSelector } from '../../state/selectors/movies.selectors';
import { Observable } from 'rxjs';
import { MovieStateItem } from '../../state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewed-movies-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewed-movies-box.component.html',
  styleUrl: './viewed-movies-box.component.scss'
})
export class ViewedMoviesBoxComponent implements OnInit {
  @Select(MoviesSelector.items)
  items$!: Observable<MovieStateItem[]>;

  public boxContent$!: Observable<MovieStateItem[]>;

  ngOnInit(): void {
    this.boxContent$ = this.items$;
  }
}

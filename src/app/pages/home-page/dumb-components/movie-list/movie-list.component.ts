import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MovieApiSearch } from 'src/app/shared/models/movies-api.model';

export interface PagingConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  @Input() set movieListData$(value: MovieApiSearch | null) {
    this.movieListData = value!;

    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: parseInt(this.movieListData.totalResults)
    };
  };

  @Output() onPaginationChange = new EventEmitter<number>();

  movieListData: MovieApiSearch = {} as MovieApiSearch;
  currentPage: number  = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pagingConfig: PagingConfig = {} as PagingConfig;

  constructor() {}

  onTableDataChange(event:any) {
    this.pagingConfig.currentPage = event;
    this.onPaginationChange.emit(this.pagingConfig.currentPage);
    window.scrollTo(0,0);
  }
}

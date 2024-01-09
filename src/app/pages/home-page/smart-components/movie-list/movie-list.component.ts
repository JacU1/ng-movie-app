import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MovieApiSearch } from 'src/app/shared/models/movies-api.model';
import { MovieListItemComponent } from '../../dumb-components/movie-list-item/movie-list-item.component';

export interface PagingConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, MovieListItemComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit {
  @Input() set movieListData$(value: MovieApiSearch | null) {
    this.movieListData = value!;

    this.pagingConfig = {
      currentPage: localStorage.getItem('currentPage') ? parseInt(localStorage.getItem('currentPage')!) : 1,
      totalItems: parseInt(value!.totalResults),
      itemsPerPage: 10
    }
  };
  public pagingConfig!: PagingConfig;

  @Output() onPaginationChange = new EventEmitter<number>();

  movieListData: MovieApiSearch = {} as MovieApiSearch;

  constructor(private readonly _router: Router) {}

  ngOnInit(): void {
  }

  onPageChange(event:any) {
    localStorage.setItem('currentPage', event);
    this._router.navigate(['movies/page/' + event]);
    this.onPaginationChange.emit(event);
    window.scrollTo(0,0);
  }
}

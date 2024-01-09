import { SearchItem } from './../../models/movies-api.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Collapse,
  initTE,
  Ripple,
  Select
} from "tw-elements";
import { MoviesDataService } from '../../services/movies-data.service';
import { Observable, Subject, Subscription, map, switchMap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { ToastTypes } from '../../models/toast.model';
import { MovieApiSearch } from '../../models/movies-api.model';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule, NgSelectModule],
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  public searchFormGroup: FormGroup;
  public movieTypes: string[] = ['Movie', 'Series', 'Episode'];
  public searchedResults$!: Observable<MovieApiSearch>;
  public selectedMovie!: string;
  public searchValue$!: Subject<string>;
  public pageNumber!: number;
  public searchedTerm!: string;
  public searchedResults!: SearchItem[];

  private sub!: Subscription;

  constructor(private readonly _fb: FormBuilder, private readonly _moviesService: MoviesDataService, private readonly _toastService: ToastService){
    this.searchFormGroup = this._fb.group({
      type: new FormControl<string>(''),
      year: new FormControl<number | null>(null , Validators.max(2024))
    });
    this.sub = new Subscription();
    this.searchValue$ = new Subject<string>();
    this.pageNumber = 1;
    this.searchedTerm = '';
    this.searchedResults = [];
  }

  ngOnInit(): void {
    initTE({ Collapse, Ripple, Select });

    this.searchedResults$ = this.searchValue$.pipe(switchMap(change => {
      return this._moviesService.getMovieBySearch(change, this.pageNumber, this.searchFormGroup.get('type')!.value, this.searchFormGroup.get('year')!.value).pipe(map(res => {
        if(res.Response !== 'False') {
          const firstValue = {
            Title: change,
            Year: '',
            imdbID: '',
            Type: '',
            Poster: ''
          };
          res.Search[0] = firstValue;
          res.Search.forEach(item => {
            this.searchedResults.push(item);
          })
          return res;
        } 
        return res;
      }));
    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getMovieBySearch(): void {
    if(this.searchFormGroup.valid && this.selectedMovie !== null && this.selectedMovie !== undefined) {
      this.sub.add(this._moviesService.getMovieBySearch(this.selectedMovie, 1, this.searchFormGroup.get('type')!.value, this.searchFormGroup.get('year')!.value).subscribe(res => {
        res.Response === 'False' ? this._moviesService.movieDataList$.next(null) : this._moviesService.movieDataList$.next(res); 
      }));
    }else {
      this._toastService.showToast(ToastTypes.DANGER, "Wrong input or empty input");
    }
  }

  clearInput(input: string): void {
    switch (input) {
      case 'selectedMovie':
        this.selectedMovie = '';
        this.searchedResults = []; 
        break;
      case 'type':
        this.searchFormGroup.get('type')!.reset();
        break;
      case 'year':
        this.searchFormGroup.get('year')!.reset();
        break;
      }
    this._moviesService.movieDataList$.next(null);
  }

  onSelectSearch(e: any): void {
    this.searchedTerm = e.term;
    this.searchValue$.next(e.term);
  }

  onScrollSearch(e: any): void {
    this.pageNumber = this.pageNumber + 1;
    this.searchValue$.next(this.searchedTerm);
  }
}
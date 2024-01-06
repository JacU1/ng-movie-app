import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Collapse,
  initTE,
  Ripple,
  Select 
} from "tw-elements";
import { MoviesDataService } from '../../services/movies-data.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';
import { ToastTypes } from '../../models/toast.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  public searchFormGroup: FormGroup;
  public movieTypes: string[] = ['movie', 'series', 'episode'];
  private sub!: Subscription;

  constructor(private readonly _fb: FormBuilder ,private readonly _moviesService: MoviesDataService, private readonly _toastService: ToastService){
    this.searchFormGroup = this._fb.group({
      searchInput: new FormControl<string>(''),
      type: new FormControl<string>(''),
      year: new FormControl<number | null>(null , Validators.max(2024))
    });
    this.sub = new Subscription();
  }

  ngOnInit(): void {
    initTE({ Collapse, Ripple, Select  });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getMovieBySearch(): void {
    if(this.searchFormGroup.valid) {
      this.sub.add(this._moviesService.getMovieBySearch(this.searchFormGroup.get('searchInput')!.value, 1, this.searchFormGroup.get('type')!.value, this.searchFormGroup.get('year')!.value).subscribe(res => {
        this._moviesService.movieDataList$.next(res);
      }));
    }else {
      this._toastService.showToast(ToastTypes.DANGER, "Wrong input");
    }
  }

  clearInput(input: string): void {
    switch (input) {
      case 'search':
        this.searchFormGroup.get('searchInput')!.reset(); 
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

}
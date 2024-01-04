import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  Collapse,
  initTE,
  Ripple
} from "tw-elements";
import { MoviesDataService } from '../../services/movies-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  public searchInput: FormControl;

  constructor(private readonly _moviesService: MoviesDataService){
    this.searchInput = new FormControl('');
  }

  ngOnInit(): void {
    initTE({ Collapse, Ripple });
  }

  getMovieBySearch(): void {
    this._moviesService.getMovieByTitleSearch(this.searchInput.value).subscribe(res => console.log(res));
  }

}
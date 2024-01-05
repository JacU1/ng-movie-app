import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, filter, tap } from 'rxjs';
import { MovieApiResponse, MovieApiSearch } from '../models/movies-api.model';
import { environment } from 'src/environments/environment.prod';
import { ToastService } from './toast.service';
import { ToastTypes } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesDataService {

  public movieDataList$!: BehaviorSubject<MovieApiSearch | null>;
  public searchedMovieTitle!: string;

  constructor(private readonly _http: HttpClient,
    private readonly _toastService: ToastService) {
      this.movieDataList$ = new BehaviorSubject<MovieApiSearch | null>(null);
    }

  public getMovieByTitle(title: string): Observable<MovieApiResponse> {
    const url = `${environment.apiUrl}${environment.apiKey}&t=${title}`;
    return this._http.get<MovieApiResponse>(url).pipe(tap(res => res.Response === "False" ? this._toastService.showToast(ToastTypes.DANGER, "Błąd podczas wczytywania danych.") : null),catchError(err => {
      this._toastService.showToast(ToastTypes.DANGER, "Błąd podczas wczytywania danych.");
      return EMPTY;
    }));
  }

  public getMovieByTitleSearch(title: string, pageNumber: number = 1): Observable<MovieApiSearch> {
    const url = `${environment.apiUrl}${environment.apiKey}&s=${title}&page=${pageNumber}`;
    this.searchedMovieTitle = title;
    return this._http.get<MovieApiSearch>(url).pipe(tap(res => res.Response === "False" ? this._toastService.showToast(ToastTypes.DANGER, "Błąd podczas wczytywania danych.") : null),catchError(err => {
      this._toastService.showToast(ToastTypes.DANGER, "Błąd podczas wczytywania danych.");
      return EMPTY;
    }));
  }
  //Ten Tap dodany ponieważ, w niektórych przypadkach api zwraca błąd jako response z code 200.
}

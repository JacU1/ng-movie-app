import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { MovieApiResponse, MovieApiSearch } from '../models/movies-api.model';
import { environment } from 'src/environments/environment.prod';
import { ToastService } from './toast.service';
import { ToastTypes } from '../models/toast.model';

@Injectable({
    providedIn: 'root',
})
export class MoviesDataService {

  constructor(private readonly _http: HttpClient,
    private readonly _toastService: ToastService) { }

  public getMovieByTitle(title: string): Observable<MovieApiResponse> {
    const url = `${environment.apiUrl}${environment.apiKey}&t=${title}`;
    return this._http.get<MovieApiResponse>(url).pipe(tap(res => res.Response === "False" ? this._toastService.showToast(ToastTypes.DANGER, "Błąd podczas wczytywania danych.") : null),catchError(err => {
      this._toastService.showToast(ToastTypes.DANGER, "Błąd podczas wczytywania danych.");
      return EMPTY;
    }));
  }

  public getMovieByTitleSearch(title: string): Observable<MovieApiSearch> {
    const url = `${environment.apiUrl}${environment.apiKey}&s=${title}`;
    return this._http.get<MovieApiSearch>(url).pipe(tap(res => res.Response === "False" ? this._toastService.showToast(ToastTypes.DANGER, "Błąd podczas wczytywania danych.") : null),catchError(err => {
      this._toastService.showToast(ToastTypes.DANGER, "Błąd podczas wczytywania danych.");
      return EMPTY;
    }));
  }
}

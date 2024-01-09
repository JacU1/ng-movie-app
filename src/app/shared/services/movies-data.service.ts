import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, filter, tap } from 'rxjs';
import { MovieApiResponse, MovieApiSearch } from '../models/movies-api.model';
import { environment } from 'src/environments/environment.prod';
import { ToastService } from './toast.service';
import { ToastTypes } from '../models/toast.model';
import { LoadingSpinnerService } from './loading-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesDataService {

  public movieDataList$!: BehaviorSubject<MovieApiSearch | null>;
  public searchedMovieTitle!: string;

  constructor(private readonly _http: HttpClient,
    private readonly _toastService: ToastService,
    private readonly _loadingSpinner: LoadingSpinnerService) {
      this.movieDataList$ = new BehaviorSubject<MovieApiSearch | null>(null);
    }

  public getMovieByTitle(title: string): Observable<MovieApiResponse> {
    this._loadingSpinner.showSpinner();
    const url = `${environment.apiUrl}${environment.apiKey}&t=${title}`;
    return this._http.get<MovieApiResponse>(url).pipe(tap(res => {
      res ? this._loadingSpinner.hideSpinner(): null;
      res.Response === "False" ? this._toastService.showToast(ToastTypes.DANGER, "Error during featching data") : null
    }),catchError(err => {
      err ? this._loadingSpinner.hideSpinner() : null;
      this._toastService.showToast(ToastTypes.DANGER, "Error during featching data");
      return EMPTY;
    }));
  }

  public getMovieById(id: string): Observable<MovieApiResponse> {
    this._loadingSpinner.showSpinner();
    const url = `${environment.apiUrl}${environment.apiKey}&i=${id}&plot=full`;
    return this._http.get<MovieApiResponse>(url).pipe(tap(res => {
      res ? this._loadingSpinner.hideSpinner() : null;
      res.Response === "False" ? this._toastService.showToast(ToastTypes.DANGER, "Error during featching data") : null
    }),catchError(err => {
      err ? this._loadingSpinner.hideSpinner() : null;
      this._toastService.showToast(ToastTypes.DANGER, "Error during featching data");
      return EMPTY;
    }));
  }

  public getMovieBySearch(title: string, pageNumber: number = 1, type: string = '', year: string = ''): Observable<MovieApiSearch> {
    const url = `${environment.apiUrl}${environment.apiKey}&s=${title}&type=${type}&y=${year}&page=${pageNumber}`;
    this.searchedMovieTitle = title;
    return this._http.get<MovieApiSearch>(url).pipe(tap(res => {
    }),catchError(err => {
      this._toastService.showToast(ToastTypes.DANGER, "Error during featching data");
      return EMPTY;
    }));
  }
  // Tap added because for some reasone api is returing error as 200.
  // Loading spinner here and not in interceptor for now, due to work on fuzzy search
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, catchError, filter, tap } from 'rxjs';
import { MovieApiResponse, MovieApiSearch } from '../models/movies-api.model';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';
import { ToastTypes } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesDataService {

  public movieDataList$!: BehaviorSubject<MovieApiSearch>;
  public searchedMovieTitle!: string;

  constructor(private readonly _http: HttpClient,
    private readonly _toastService: ToastService) {
      this.movieDataList$ = new BehaviorSubject<MovieApiSearch>({} as MovieApiSearch);
    }

  public getMovieByTitle(title: string): Observable<MovieApiResponse> {
    const url = `${environment.apiUrl}${environment.apiKey}&t=${title}`;
    return this._http.get<MovieApiResponse>(url).pipe(tap(res => res.Response === "False" ? this._toastService.showToast(ToastTypes.DANGER, "Error during featching data") : null),catchError(err => {
      this._toastService.showToast(ToastTypes.DANGER, "Error during featching data");
      return EMPTY;
    }));
  }

  public getMovieById(id: string): Observable<MovieApiResponse> {
    const url = `${environment.apiUrl}${environment.apiKey}&i=${id}&plot=full`;
    return this._http.get<MovieApiResponse>(url).pipe(tap(res => res.Response === "False" ? this._toastService.showToast(ToastTypes.DANGER, "Error during featching data") : null),catchError(err => {
      this._toastService.showToast(ToastTypes.DANGER, "Błąd podczas wczytywania danych.");
      return EMPTY;
    }));
  }

  public getMovieBySearch(title: string, pageNumber: number = 1, type: string = '', year: string = ''): Observable<MovieApiSearch> {
    const url = `${environment.apiUrl}${environment.apiKey}&s=${title}&type=${type}&y=${year}&page=${pageNumber}`;
    this.searchedMovieTitle = title;
    return this._http.get<MovieApiSearch>(url).pipe(tap(res => {
      res.Response === "False" && res.Error !== "Movie not found!" ? this._toastService.showToast(ToastTypes.DANGER, "Error during featching data") : null;
      res.Response === "False" && res.Error === "Movie not found!" ? this._toastService.showToast(ToastTypes.DANGER, "Movie not found!") : null
    }),catchError(err => {
      this._toastService.showToast(ToastTypes.DANGER, "Error during featching data");
      return EMPTY;
    }));
  }
  //Ten Tap dodany ponieważ, w niektórych przypadkach api zwraca błąd jako response z code 200.
}

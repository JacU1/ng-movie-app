import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  public isLoading$ = signal<boolean>(false);

  constructor() { }

  public showSpinner(): void {
    this.isLoading$.set(true);
  }

  public hideSpinner(): void {
    this.isLoading$.set(false);
  }
}

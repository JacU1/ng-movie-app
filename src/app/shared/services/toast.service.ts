import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToastModel, ToastTypes } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toast$ = new Subject<ToastModel>();

  constructor() { }

  public showToast(type: ToastTypes, message: string): void {
    this.toast$.next({type, message, show: true}!);

    setTimeout(() => {
      this.toast$.next({type, message, show: false}!);
    }, 2800);
  }
}

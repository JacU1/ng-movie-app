import { Component, OnInit } from '@angular/core';
import {
  Toast,
  initTE,
} from "tw-elements";
import { ToastTypes } from '../../models/toast.model';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  public toastType?: ToastTypes;
  public toastMessage?: string;
  public toast$ = this._toastService.toast$.asObservable();

  private subs = new Subscription();

  constructor(private readonly _toastService: ToastService) {
    this.subs.add(this.toast$.subscribe(res => {
      this.toastType = res.type;
      this.toastMessage = res.message;
    }));
  }

  ngOnInit(): void {
    initTE({ Toast });
  }
}

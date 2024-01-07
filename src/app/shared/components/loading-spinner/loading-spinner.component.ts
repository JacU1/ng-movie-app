import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {

  constructor(private readonly _loadingSpinnerService: LoadingSpinnerService){}
  
  public isLoading$: Observable<boolean> = toObservable(this._loadingSpinnerService.isLoading$);
}

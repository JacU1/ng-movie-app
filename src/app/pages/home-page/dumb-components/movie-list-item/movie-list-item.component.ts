import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchItem } from 'src/app/shared/models/movies-api.model';

@Component({
  selector: 'app-movie-list-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './movie-list-item.component.html',
  styleUrl: './movie-list-item.component.scss'
})
export class MovieListItemComponent {
  @Input() movie!: SearchItem;
}

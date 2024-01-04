import { Component, OnInit } from '@angular/core';
import {
  Input,
  Ripple,
  initTE,
} from "tw-elements";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  ngOnInit(): void {
    initTE({ Input, Ripple });
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePageComponent } from './movie-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('MoviePageComponent', () => {
  let component: MoviePageComponent;
  let fixture: ComponentFixture<MoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviePageComponent, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedMoviesBoxComponent } from './viewed-movies-box.component';
import { NgxsModule } from '@ngxs/store';
import { MoviesState } from '../../state';

describe('ViewedMoviesBoxComponent', () => {
  let component: ViewedMoviesBoxComponent;
  let fixture: ComponentFixture<ViewedMoviesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewedMoviesBoxComponent,
        NgxsModule.forRoot([MoviesState]),]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewedMoviesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

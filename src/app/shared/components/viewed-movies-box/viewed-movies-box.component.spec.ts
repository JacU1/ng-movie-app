import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedMoviesBoxComponent } from './viewed-movies-box.component';

describe('ViewedMoviesBoxComponent', () => {
  let component: ViewedMoviesBoxComponent;
  let fixture: ComponentFixture<ViewedMoviesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewedMoviesBoxComponent]
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

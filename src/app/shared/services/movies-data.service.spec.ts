import { TestBed } from '@angular/core/testing';

import { MoviesDataService } from './movies-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('MoviesDataService', () => {
  let service: MoviesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(MoviesDataService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

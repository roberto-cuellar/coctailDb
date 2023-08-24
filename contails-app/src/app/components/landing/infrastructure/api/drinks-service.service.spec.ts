import { TestBed } from '@angular/core/testing';

import { DrinksServiceService } from './drinks-service.service';

describe('DrinksServiceService', () => {
  let service: DrinksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrinksServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

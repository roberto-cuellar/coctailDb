import { TestBed } from '@angular/core/testing';

import { DrinksRepositoryService } from './drinks-repository.service';

describe('DrinksRepositoryService', () => {
  let service: DrinksRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrinksRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

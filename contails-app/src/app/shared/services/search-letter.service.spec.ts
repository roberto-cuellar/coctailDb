import { TestBed } from '@angular/core/testing';

import { SearchLetterService } from './search-letter.service';

describe('SearchLetterService', () => {
  let service: SearchLetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchLetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

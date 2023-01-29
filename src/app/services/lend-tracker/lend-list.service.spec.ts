import { TestBed } from '@angular/core/testing';

import { LendListService } from './lend-list.service';

describe('LendListService', () => {
  let service: LendListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LendListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

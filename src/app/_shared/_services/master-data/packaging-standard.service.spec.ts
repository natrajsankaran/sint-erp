import { TestBed } from '@angular/core/testing';

import { PackagingStandardService } from './packaging-standard.service';

describe('PackagingStandardService', () => {
  let service: PackagingStandardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackagingStandardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

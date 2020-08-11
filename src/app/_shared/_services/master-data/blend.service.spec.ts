import { TestBed } from '@angular/core/testing';

import { BlendService } from './blend.service';

describe('BlendService', () => {
  let service: BlendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FormQuestionUtilityService } from './form-question-utility.service';

describe('FormQuestionUtilityService', () => {
  let service: FormQuestionUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormQuestionUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

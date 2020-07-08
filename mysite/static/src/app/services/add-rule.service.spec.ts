import { TestBed } from '@angular/core/testing';

import { AddRuleService } from './add-rule.service';

describe('AddRuleService', () => {
  let service: AddRuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

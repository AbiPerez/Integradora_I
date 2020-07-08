import { TestBed } from '@angular/core/testing';

import { DropRuleService } from './drop-rule.service';

describe('DropRuleService', () => {
  let service: DropRuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropRuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

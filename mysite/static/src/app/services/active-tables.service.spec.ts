import { TestBed } from '@angular/core/testing';

import { ActiveTablesService } from './active-tables.service';

describe('ActiveTablesService', () => {
  let service: ActiveTablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveTablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

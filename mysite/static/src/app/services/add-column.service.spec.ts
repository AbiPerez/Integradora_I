import { TestBed } from '@angular/core/testing';

import { AddColumnService } from './add-column.service';

describe('AddColumnService', () => {
  let service: AddColumnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddColumnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

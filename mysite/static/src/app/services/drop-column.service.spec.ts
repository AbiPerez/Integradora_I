import { TestBed } from '@angular/core/testing';

import { DropColumnService } from './drop-column.service';

describe('DropColumnService', () => {
  let service: DropColumnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropColumnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TreeTableService } from './tree-table.service';

describe('TreeTableService', () => {
  let service: TreeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

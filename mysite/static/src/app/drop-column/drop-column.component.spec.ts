import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropColumnComponent } from './drop-column.component';

describe('DropColumnComponent', () => {
  let component: DropColumnComponent;
  let fixture: ComponentFixture<DropColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

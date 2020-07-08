import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropRuleComponent } from './drop-rule.component';

describe('DropRuleComponent', () => {
  let component: DropRuleComponent;
  let fixture: ComponentFixture<DropRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDiscountFormComponent } from './manager-discount-form.component';

describe('ManagerDiscountFormComponent', () => {
  let component: ManagerDiscountFormComponent;
  let fixture: ComponentFixture<ManagerDiscountFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerDiscountFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerDiscountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

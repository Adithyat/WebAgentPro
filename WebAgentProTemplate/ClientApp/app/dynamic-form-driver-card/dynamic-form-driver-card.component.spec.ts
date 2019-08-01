import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormDriverCardComponent } from './dynamic-form-driver-card.component';

describe('DynamicFormDriverCardComponent', () => {
  let component: DynamicFormDriverCardComponent;
  let fixture: ComponentFixture<DynamicFormDriverCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormDriverCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormDriverCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

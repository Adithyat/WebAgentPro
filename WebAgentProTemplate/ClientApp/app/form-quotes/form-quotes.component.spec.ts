import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuotesComponent } from './form-quotes.component';

describe('FormQuotesComponent', () => {
  let component: FormQuotesComponent;
  let fixture: ComponentFixture<FormQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

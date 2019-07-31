import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterQuotesComponent } from './filter-quotes.component';

describe('FilterQuotesComponent', () => {
  let component: FilterQuotesComponent;
  let fixture: ComponentFixture<FilterQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

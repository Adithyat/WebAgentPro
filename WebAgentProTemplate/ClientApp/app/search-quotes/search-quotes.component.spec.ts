import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQuotesComponent } from './search-quotes.component';

describe('SearchQuotesComponent', () => {
  let component: SearchQuotesComponent;
  let fixture: ComponentFixture<SearchQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

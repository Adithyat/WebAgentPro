import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteProgressComponent } from './quote-progress.component';

describe('QuoteProgressComponent', () => {
  let component: QuoteProgressComponent;
  let fixture: ComponentFixture<QuoteProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

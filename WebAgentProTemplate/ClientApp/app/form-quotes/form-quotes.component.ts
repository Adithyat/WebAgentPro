import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/_services';
import { QuotesService } from '@app/_services/quotes.service';
import { Quote } from '@app/_models/quote';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-form-quotes',
  templateUrl: './form-quotes.component.html',
  styleUrls: ['./form-quotes.component.css']
})
export class FormQuotesComponent implements OnInit {
  quoteEdit: Quote;

  constructor(private service: QuotesService, private alertService: AlertService) { }

  ngOnInit() {
    this.createQuote();
  }

  createQuote() {
    this.quoteEdit = new Quote();
  }

  cancelCreate() {
    this.alertService.success('Quote creation cancelled.');
    this.resetEdit();
  }

  onSubmit() {
    if (this.quoteEdit.firstName != null && this.quoteEdit.lastName != null) {
      this.saveCreate();
    }
  }

  saveCreate() {
    this.service.postQuote(this.quoteEdit).pipe(first()).subscribe(
        returnedQuote => {
            this.resetEdit();
            this.alertService.success('Quote Created.', false);
        },
        error => {
            this.alertService.error('Quote update failed.', false);
        });
  }

  resetEdit() {
    this.quoteEdit = new Quote;
  }

  cancelEdit() {
    this.alertService.success('Quote update cancelled.');
    this.resetEdit();
  }

}

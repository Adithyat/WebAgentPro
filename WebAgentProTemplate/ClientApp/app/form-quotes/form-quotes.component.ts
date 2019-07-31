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
      if (this.quoteEdit.q_FirstName != null && this.quoteEdit.q_LastName != null
          && this.quoteEdit.address != null && this.quoteEdit.city != null
          && this.quoteEdit.q_StateCode != null && this.quoteEdit.postalCode != null
          && this.quoteEdit.q_ssn != null && this.quoteEdit.q_DateOfBirth != null
          && this.quoteEdit.q_Email != null && this.quoteEdit.previousCarrier != null) {
      this.saveCreate();
      }

      //store quoteId
  }

    saveCreate() {
    this.service.postQuote(this.quoteEdit).subscribe(
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

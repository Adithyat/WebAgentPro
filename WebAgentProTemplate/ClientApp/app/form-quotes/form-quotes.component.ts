import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/_services';
import { QuotesService } from '@app/_services/quotes.service';
import { FormService }from '@app/_services/form.service';
import { Quote } from '@app/_models/quote';
import { first } from 'rxjs/operators';
import { Router }              from '@angular/router';

@Component({
  selector: 'app-form-quotes',
  templateUrl: './form-quotes.component.html',
  styleUrls: ['./form-quotes.component.css']
})
export class FormQuotesComponent implements OnInit {
    quoteEdit: Quote;
    // createdQuoteId: number;

  constructor(
    private router: Router, 
    private quoteService: QuotesService, 
    private formService: FormService, 
    private alertService: AlertService) { }

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

  goToNext() {
        // Navigate to the result page

  }


  saveCreate() {
    this.quoteService.postQuote(this.quoteEdit).subscribe(
        returnedQuote => {
            console.log(returnedQuote);
            this.formService.setQId(returnedQuote.quoteId);
            this.resetEdit();
            this.alertService.success('Quote Created.', false);
        },
        error => {
          this.alertService.error('Quote update failed.', false);
        });
  }

    saveChange() {
        this.quoteService.putQuote(this.quoteEdit, 4).subscribe(
            response => {
                console.log(response);
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

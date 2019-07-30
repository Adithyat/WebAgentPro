import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/_services';
import { QuotesService } from '@app/_services/quotes.service';
import { Quote } from '@app/_models/quote';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-new-quotes',
  templateUrl: './new-quotes.component.html',
  styleUrls: ['./new-quotes.component.css']
})
export class NewQuotesComponent implements OnInit {
  quotes: Quote[];
  quoteEdit: Quote;     // Hold the widget currently being edited.

  constructor(private service: QuotesService, private alertService: AlertService) { }

  ngOnInit() {
        this.getQuotes();

  }

  // create an empty widget to populate the create form
  createQuote() {
    this.quoteEdit = new Quote();
  }
  
  getQuotes() {
    this.service.getQuotes().subscribe(returnedQuotes => { this.quotes = returnedQuotes });
  }

  

   // exit out of the create process without updating
   cancelCreate() {
    this.alertService.success('Quote creation cancelled.');
    this.resetEdit();
  }

  // determine if the submit is for a create or an edit
  onSubmit() {
    this.saveCreate();
    console.log('clicked');
  }





  // save the new widget to the API
  saveCreate() {
    this.service.postQuote(this.quoteEdit).pipe(first()).subscribe(
        returnedWidget => {
            this.resetEdit();
            this.getQuotes();
            this.alertService.success('Quote Created.', false);
        },
        error => {
            this.alertService.error('Quote update failed.', false);
        });
  }

  // after editing reset the component
  resetEdit() {
    this.quoteEdit = null;
  }

  cancelEdit() {
    this.alertService.success('Quote update cancelled.');
    this.resetEdit();
  }

}

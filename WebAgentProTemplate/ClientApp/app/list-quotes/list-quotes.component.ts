import { Component, OnInit } from '@angular/core';
import { QuoteService } from '@app/_services/quote.service';
import { Quote } from '@app/_models/quote';
import { AlertService } from '@app/_services';


@Component({
  selector: 'app-list-quotes',
  templateUrl: './list-quotes.component.html',
  styleUrls: ['./list-quotes.component.css']
})
export class ListQuotesComponent implements OnInit {
  pageTitle: 'Quotes';
  quotes: Quote[] = [];
  filteredQuotes: Quote[] = [];
  _listFilter = '';


  constructor(private quoteService: QuoteService, private alertService: AlertService) { }
  
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredQuotes = this.listFilter ? this.performFilter(this.listFilter) : this.quotes;
    //console.log(this.filteredQuotes);
  }
  
  performFilter(filterBy: string): Quote[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.quotes.filter((quote: Quote) =>
      quote.q_FirstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes() {
    this.quoteService.getQuotes().subscribe(
      returnedQuotes => { 
        this.quotes = returnedQuotes;
        this.filteredQuotes = this.quotes; 
      });
    //console.log(this.filteredQuotes);
  }

  deleteQuote(id: number) {
    this.quoteService.deleteQuote(id).subscribe(
        success => {
            this.getQuotes();
            this.alertService.success('Quote deleted successfully.'); 
        },
        (error: any) => {
          this.alertService.error('Quote deletion failed.');
        }
    );
  }


}

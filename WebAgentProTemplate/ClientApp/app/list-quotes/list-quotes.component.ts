import { Component, OnInit } from '@angular/core';
import { QuotesService } from '@app/_services/quotes.service';
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


  constructor(private service: QuotesService, private alertService: AlertService) { }
  
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredQuotes = this.listFilter ? this.performFilter(this.listFilter) : this.quotes;
    console.log(this.filteredQuotes);
  }
  
  performFilter(filterBy: string): Quote[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.quotes.filter((quote: Quote) =>
      quote.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.service.getQuotes().subscribe(
      quotes => {
        this.quotes = quotes;
        this.filteredQuotes = this.quotes;
      },
      error => {
        this.alertService.error('Quote filter failed.');
      }
    );
  }

  getQuotes() {
    this.service.getQuotes().subscribe(returnedQuotes => { this.quotes = returnedQuotes; });
    console.log(this.quotes);
  }

  deleteQuote(id: number) {
    this.service.deleteQuote(id).subscribe(
        success => {
            this.alertService.success('Quote deleted successfully.');
            this.getQuotes();
        }
    );
  }


}

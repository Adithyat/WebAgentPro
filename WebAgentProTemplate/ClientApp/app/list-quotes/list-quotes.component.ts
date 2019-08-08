import { Component, OnInit } from '@angular/core';
import { QuoteService } from '@app/_services/quote.service';
import { Quote } from '@app/_models/quote';
import { AlertService } from '@app/_services';
import { Router, ActivatedRoute } from '@angular/router';


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


  constructor(
    private quoteService: QuoteService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute, ) { }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredQuotes = this.listFilter ? this.performFilter(this.listFilter) : this.quotes;
    // console.log(this.filteredQuotes);
  }

  performFilter(filterBy: string): Quote[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.quotes.filter((quote: Quote) =>
    (quote.q_FirstName !== null && quote.q_FirstName.toLocaleLowerCase().indexOf(filterBy) !== -1
      || quote.q_LastName !== null && quote.q_LastName.toLocaleLowerCase().indexOf(filterBy) !== -1
      || (quote.q_FirstName + ' ' + quote.q_LastName) !== null && (quote.q_FirstName + ' ' + quote.q_LastName).toLocaleLowerCase().indexOf(filterBy) !== -1
      || quote.quoteId !== null && quote.quoteId.toString().indexOf(filterBy) !== -1
      ));
    // || (quote.q_LastName !== null && quote.q_LastName.toLocaleLowerCase().indexOf(filterBy) !== -1))

  }

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes() {
    this.quoteService.getQuotes().subscribe(
      returnedQuote => {
        this.quotes = returnedQuote;
        this.filteredQuotes = this.quotes;
        console.log(this.filteredQuotes);
      });
  }

  editQuote(id: number) {
    this.router.navigate(['quotes'], { queryParams: { id: id } });
  }

  copyQuote(id: number) {
    const copyQuote: Quote = this.quotes.find((quote: Quote) => quote.quoteId === id);
    copyQuote.q_FirstName = '';
    copyQuote.q_LastName = '';
    copyQuote.q_SSN = '';
    copyQuote.quoteId = null;
    
    console.log(copyQuote);
    this.quoteService.postQuote(copyQuote).subscribe(
      returnedQuote => {
          console.log(returnedQuote);
          this.alertService.success('Quote copied.', false);
          this.router.navigate(['quotes'], { queryParams: { id: returnedQuote.quoteId } });
      },
      error => {
        this.alertService.error('Quote copy failed.', false);
      });
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

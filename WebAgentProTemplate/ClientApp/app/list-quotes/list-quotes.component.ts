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
      || quote.city !== null && quote.city.indexOf(filterBy) !== -1
      || quote.q_StateCode !== null && quote.q_StateCode.indexOf(filterBy) !== -1
      || quote.postalCode !== null && quote.postalCode.indexOf(filterBy) !== -1
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

    viewQuote(id: number) {
        this.router.navigate(['view-quote'], { queryParams: { id: id } });
    }


    updateDates(quote) {
      quote.quoteStatus = 0;
      if(quote.q_DateOfBirth !== null){
        quote.q_DateOfBirth = quote.q_DateOfBirth.substring(0, 10);
        for (let driver of quote.quoteDrivers) {
            driver.d_DateOfBirth = driver.d_DateOfBirth.substring(0, 10)
        }
      }
      else{
      }
    }
  cQuote: Quote = new Quote;
  copyQuote(id: number) {
    console.log(id);
    this.quoteService.getQuote(id).subscribe(
        returnedQuote => {


          this.cQuote.address = returnedQuote.address;
          this.cQuote.city = returnedQuote.city;
          this.cQuote.q_StateCode = returnedQuote.q_StateCode;
          this.cQuote.postalCode = returnedQuote.postalCode;
          this.cQuote.previousCarrier = returnedQuote.previousCarrier;
          this.cQuote.lessThanThreeYearsDriving = returnedQuote.lessThanThreeYearsDriving;
          this.cQuote.claimInLastFiveYears = returnedQuote.claimInLastFiveYears;
          this.cQuote.movingViolationInLastFiveYears = returnedQuote.movingViolationInLastFiveYears;
          this.cQuote.forceMultiCarDiscount = returnedQuote.forceMultiCarDiscount;

            this.quoteService.postQuote(this.cQuote).subscribe(
              returnedQuote => {
                  const copQuote = Object.assign([], this.cQuote);
                  console.log(returnedQuote);
                  this.quoteService.putQuote( returnedQuote, returnedQuote.quoteId).subscribe(
                    returnedQuote => {
                        console.log(returnedQuote);
                        this.alertService.success('Quote copied.', false);
                        this.router.navigate(['quotes'], { queryParams: { id: returnedQuote.quoteId } });
                    });
              });
            //this.updateDates(this.cQuote);
            console.log(this.cQuote);
        },
        error => {
              this.alertService.error('Error: cannot access quotes of other agents.', false);
              this.router.navigate(['/']);
        });
    //this.cQuote.quoteId = null;
    //console.log(this.cQuote);
    //console.log(this.quotes.find((quote: Quote) => quote.quoteId === id));
    /*
    const copiedQuote: Quote = new Quote;
    copiedQuote.address = copyQuote.address;
    copiedQuote.city = copyQuote.city;
    copiedQuote.q_StateCode = copyQuote.q_StateCode;
    copiedQuote.postalCode = copyQuote.postalCode;
    copiedQuote.previousCarrier = copyQuote.previousCarrier;
    copiedQuote.lessThanThreeYearsDriving = copyQuote.lessThanThreeYearsDriving;
    copiedQuote.claimInLastFiveYears = copyQuote.claimInLastFiveYears;
    copiedQuote.movingViolationInLastFiveYears = copyQuote.movingViolationInLastFiveYears;
    copiedQuote.forceMultiCarDiscount = copyQuote.forceMultiCarDiscount;
    console.log('cqd');
    console.log(copyQuote.quoteDrivers);
    copiedQuote.quoteDrivers = copyQuote.quoteDrivers;
    copiedQuote.quoteVehicles = copyQuote.quoteVehicles;
    console.log(copiedQuote);
          */


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

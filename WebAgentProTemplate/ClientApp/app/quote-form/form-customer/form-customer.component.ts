import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/_services';
import { QuoteService } from '@app/_services/quote.service';
import { Quote } from '@app/_models/quote';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-form-customer',
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit {
    private quoteIdSubscription: Subscription;
    quote: Quote = new Quote;



  constructor(
    private quoteService: QuoteService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }



  ngOnInit() {


    this.route.queryParams.subscribe(
      params => {
          // this.widgetID = +params['id'];
          this.quote.quoteId = +params['id'] || null;
          console.log(this.quote.quoteId);
          if (this.quote.quoteId) {
            this.editQuote();
          } else {
            this.newQuote();
          }
      });

  }

  newQuote() {
    //console.log('new');
    this.quote = new Quote;
  }

  editQuote() {
    // console.log(this.route.params);
    // this.router.navigate([`/quotes/${this.quote.quoteId}`]);
    //console.log('edit');
    this.quoteService.getQuote(this.quote.quoteId)
    .subscribe(
      returnedQuote => {
        this.quote = returnedQuote;
        console.log(returnedQuote);
      });
  }

  save() {
    console.log(this.quote.quoteId);
    if (this.quote.quoteId) {
      //console.log('savechange');
      this.saveChange();
    } else {
      
      //console.log('savecreate');
      this.saveCreate();
    }
  }


  saveCreate() {
    console.log('savecreate');
   
    this.quoteService.postQuote(this.quote).subscribe(
        returnedQuote => {
            console.log(returnedQuote);
            // this.quoteService.setQId(returnedQuote.quoteId);
            // this.newQuote();
            this.alertService.success('Quote created.', false);
            // const url = this.router.createUrlTree([returnedQ`uote.quoteId], {relativeTo: this.route}).toString();
            // console.log(url);
            // tslint:disable-next-line: no-unused-expression
            // this.location.replaceState[url];
            // this.router.navigate([`/quotes/${returnedQuote.quoteId}`]);
            this.router.navigate(['quotes'], { queryParams: { id: returnedQuote.quoteId } });
        },
        error => {
          this.newQuote();
          this.alertService.error('Quote create failed.', false);
        });
  }

  saveChange() {
    console.log('savechange');
    this.quoteService.putQuote(this.quote, this.quote.quoteId).subscribe(
          response => {
            console.log(response);
            // this.newQuote();
            this.alertService.success('Quote saved.', false);
          },
          error => {
            this.newQuote();
            this.alertService.error('Quote save failed.', false);
          });
  }

}

import { Component, OnInit } from '@angular/core';
import { QuotesService } from '@app/_services/quotes.service';
import { FormService } from '@app/_services/form.service';
import {QuoteReceipt} from '@app/_models/quotereceipt';


@Component({
  selector: 'app-form-summary',
  templateUrl: './form-summary.component.html',
  styleUrls: ['./form-summary.component.css']
})
export class FormSummaryComponent implements OnInit {
  CQ: QuoteReceipt = new QuoteReceipt;
  constructor(
    private formService: FormService,
    private quoteService: QuotesService
    ) { }
  

  ngOnInit() {
    //console.log(this.formService.getCalculatedQuote());
    /*
    this.quoteService.getQuote(this.formService.getQid())
    .subscribe(
      returnedQuote => { 
        console.log(returnedQuote)
      });
    */
    this.formService.getCalculatedQuote()
    .subscribe(QuoteReceipt => {
        console.log(QuoteReceipt)
        this.CQ = QuoteReceipt;
    })

  }

}

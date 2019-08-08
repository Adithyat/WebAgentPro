import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/_services';
import { QuoteService } from '@app/_services/quote.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuoteReceipt } from '@app/_models/quotereceipt';
import { Pipe, PipeTransform } from '@angular/core';
import { Quote } from '@app/_models/quote'

@Component({
    selector: 'app-form-summary',
    templateUrl: './form-summary.component.html',
    styleUrls: ['./form-summary.component.css']
})
export class FormSummaryComponent implements OnInit {
    quoteId: number;
    calculatedQuote: QuoteReceipt = new QuoteReceipt;
    private quoteIdSubscription: Subscription;

    prevCarrier: String[] = [
        'N/A',
        'Lizard Insurance',
        'Pervasive Insurance'
    ];
    constructor(
        private quoteService: QuoteService,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute
    ) { }


    ngOnInit() {
        // console.log(this.formService.getCalculatedQuote());
        /*
        this.quoteService.getQuote(this.formService.getQid())
        .subscribe(
          returnedQuote => {
            console.log(returnedQuote)
          });
        */

    }
    stepInit() {
        //console.log(this.calculatedQuote);
        this.quoteIdSubscription = this.route.queryParams.subscribe(
            params => {
                // this.widgetID = +params['id'];
                this.quoteId = +params['id'] || null;
                console.log(this.quoteId);
                if (this.quoteId) {
                  // this.editQuote();
                  this.getCalculatedQuote();

                } else {
                  // this.newQuote();
                  this.router.navigate(['/quotes']);
                }
            });
    }

    getCalculatedQuote(){
        this.quoteService.getCalculatedQuote(this.quoteId)
        .subscribe(returnedQuoteReceipt => {
            console.log(returnedQuoteReceipt);
            this.calculatedQuote = returnedQuoteReceipt;
            // this.totalQuoteDiscount = this.CQ.baseCost - this.CQ.finalCost
            //console.log(this.calculatedQuote);

            /*
            this.lastFour = this.CQ.quote.q_SSN.substring(5);

            // 2019-08-13T00:00:00
            this.month = this.CQ.quote.q_DateOfBirth.substring(5, 7);
            this.day = this.CQ.quote.q_DateOfBirth.substring(8, 10);
            this.year = this.CQ.quote.q_DateOfBirth.substring(0, 4);

            this.totalQuoteDiscount = this.CQ.baseCost - this.CQ.finalCost;


            this.birthday = this.month + '/' + this.day + '/' + this.year;

            console.log(this.CQ.quote.previousCarrier);
            switch (this.CQ.quote.previousCarrier) {
                case 0:
                    this.previousCarrier = 'N/A';
                    break;
                case 1:
                    this.previousCarrier = 'Lizard Insurance';
                    break;
                case 2:
                    this.previousCarrier = 'Pervasive Insurance';
                    break;
                default:
                    this.previousCarrier = 'test';
                    break;
            }
            */

        });

    }

    getDiscountValue(discount) {
        if (discount < 0) {
            return `+$${Math.abs(discount).toFixed(2)}`;
        }
        return `-$${Math.abs(discount).toFixed(2)}`;
    }

    getTotalDiscountValue(total) {
        const totalDiscount = total.baseCost - total.finalCost;
        if (totalDiscount < 0) {
            return `+$${Math.abs(totalDiscount).toFixed(2)}`;
        }
        return `-$${Math.abs(totalDiscount).toFixed(2)}`;
    }

    saveForLater(){
        this.router.navigate(['/']);
    }
    submitQuote() {
        this.calculatedQuote.quote.quoteStatus = 1;
        this.quoteService.putQuote(this.calculatedQuote.quote, this.calculatedQuote.quote.quoteId)
            .subscribe(
                response => {
                    this.alertService.success('Quote Submitted', false);
                    this.router.navigate(['/']);
                });
    }
}

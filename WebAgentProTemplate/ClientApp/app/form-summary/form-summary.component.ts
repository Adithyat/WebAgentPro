import { Component, OnInit } from '@angular/core';
import { QuotesService } from '@app/_services/quotes.service';
import { FormService } from '@app/_services/form.service';
import { QuoteReceipt } from '@app/_models/quotereceipt';
import { Pipe, PipeTransform } from '@angular/core';


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

    previousCarrier: string;
    lastFour: string;
    month: string;
    day: string;
    year: string;
    birthday: string;
    totalQuoteDiscount: number;
    totalDiscount: number;

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
                console.log(this.CQ);

                this.lastFour = this.CQ.quote.q_SSN.substring(5);

                // 2019-08-13T00:00:00
                this.month = this.CQ.quote.q_DateOfBirth.substring(5, 7);
                this.day = this.CQ.quote.q_DateOfBirth.substring(8, 10);
                this.year = this.CQ.quote.q_DateOfBirth.substring(0, 4);

                this.totalQuoteDiscount = this.CQ.baseCost - this.CQ.finalCost;
                    

                this.birthday = this.month + "/" + this.day + "/" + this.year;

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

            })

    }

    getDiscountValue(discount) {
        if (discount < 0)
            return `+$${Math.abs(discount).toFixed(2)}`;
        return `-$${Math.abs(discount).toFixed(2)}`;
    }

    getTotalDiscountValue(total) {
        this.totalDiscount = total.baseCost - total.finalCost;
        if (this.totalDiscount < 0)
            return `+$${Math.abs(this.totalDiscount).toFixed(2)}`;
        return `-$${Math.abs(this.totalDiscount).toFixed(2)}`;
    }
}
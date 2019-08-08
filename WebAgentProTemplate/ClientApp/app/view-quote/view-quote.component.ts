import { Component, OnInit } from '@angular/core';
import { Quote } from '@app/_models/quote';
import { Router, ActivatedRoute } from '@angular/router';
import { QuoteService } from '@app/_services/quote.service';
import { QuoteReceipt } from '@app/_models/quotereceipt';

@Component({
  selector: 'app-view-quote',
  templateUrl: './view-quote.component.html',
  styleUrls: ['./view-quote.component.css']
})
export class ViewQuoteComponent implements OnInit {
    quote: Quote = new Quote;
    calculatedQuote: QuoteReceipt = new QuoteReceipt;

    constructor(private quoteService: QuoteService,
        private router: Router,
        private route: ActivatedRoute, ) { }

    prevCarrier: String[] = [
        'N/A',
        'Lizard Insurance',
        'Pervasive Insurance',
        'Other'
    ];

    ngOnInit() {
        this.route.queryParams.subscribe(
            params => {
                // this.widgetID = +params['id'];
                this.quote.quoteId = +params['id'] || null;
                console.log(this.quote.quoteId);
                this.getCalculatedQuote();
                console.log(this.calculatedQuote);
            });
  }

    getCalculatedQuote() {
        this.quoteService.getCalculatedQuote(this.quote.quoteId)
            .subscribe(returnedQuoteReceipt => {
                console.log(returnedQuoteReceipt);
                this.calculatedQuote = returnedQuoteReceipt;
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
}

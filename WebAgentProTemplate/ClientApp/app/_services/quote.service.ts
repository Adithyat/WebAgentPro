import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Quote } from '@app/_models/quote';
import { QuoteReceipt } from '../_models/quotereceipt';


@Injectable({
  providedIn: 'root'
})
export class QuoteService {

    constructor(private http: HttpClient) { }


    apiUrl: string = environment.apiUrl;
    quoteID: number;
    /*
    getQuoteID(){
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
    }*/

    getQuotes() {
        return this.http.get<Quote[]>(`${this.apiUrl}/Quotes`);
    }

    getQuote(id: number) {
        return this.http.get<Quote>(`${this.apiUrl}/Quotes/${id}`);
    }

    postQuote(quote: Quote) {
        console.log('service post ');
        console.log(quote);
        return this.http.post<Quote>(`${this.apiUrl}/Quotes`, quote);
    }

    putQuote(put: Quote, id: number) {
        //console.log(put);
        return this.http.put(`${this.apiUrl}/Quotes/${id}`, put);
    }

    deleteQuote(id: number) {
      return this.http.delete(`${this.apiUrl}/Quotes/${id}`);
    }

    getCalculatedQuote(id: number) {
        return this.http.get<QuoteReceipt>(`${this.apiUrl}/Quotes/Calculate/${id}`);
    }
}

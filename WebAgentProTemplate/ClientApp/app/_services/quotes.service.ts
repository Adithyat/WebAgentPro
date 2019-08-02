import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Quote } from '@app/_models/quote';
import { QuoteReceipt } from '../_models/quotereceipt';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

    constructor(private http: HttpClient) { }


    apiUrl: string = environment.apiUrl;


    getQuotes() {
        return this.http.get<Quote[]>(`${this.apiUrl}/Quotes`);
    }

    getQuote(id: number) {
        return this.http.get<Quote>(`${this.apiUrl}/Quotes/${id}`);
    }

    postQuote(quote: Quote) {
        //console.log(quote);
        return this.http.post<Quote>(`${this.apiUrl}/Quotes`, quote);
    }

    putQuote(put: Quote, id: number) {
        return this.http.put(`${this.apiUrl}/Quotes/${id}`, put);
    }

  deleteQuote(id: number) {
    return this.http.delete(`${this.apiUrl}/Quotes/${id}`);
  }
}

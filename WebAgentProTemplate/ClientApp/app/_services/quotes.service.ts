import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Quote } from '@app/_models/quote';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

    constructor(private http: HttpClient) { }


    apiUrl: string = environment.apiUrl;
    createdQuoteId: number;

    getQid() {
      return this.createdQuoteId;
    }
    setQId(id: number) {
      this.createdQuoteId = id;
    }


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

    deleteQuote(id: number) {
      return this.http.delete(`${this.apiUrl}/Quotes/${id}`);
    }
}

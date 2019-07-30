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

  getQuotes() {
      return this.http.get<Quote[]>(`${this.apiUrl}/Quotes`);
  }

  postQuote(quote: Quote) {
    return this.http.post<Quote>(`${this.apiUrl}/Quotes`, quote);
  }

  getQuote(id: number) {
    return this.http.get<Quote>(`${this.apiUrl}/Quotes/${id}`);
  }
}

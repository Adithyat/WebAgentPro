import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { QuoteReceipt } from '../_models/quotereceipt';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

    createdQuoteId: number;
    apiUrl: string = environment.apiUrl;

    getQid() {
      return this.createdQuoteId;
    }
    setQId(id: number) {
      this.createdQuoteId = id;
    }
  
    createdDriverId: number;

    getDid() {
      return this.createdDriverId;
    }
    setDId(id: number) {
      this.createdDriverId = id;
    }

    getCalculatedQuote() {
        return this.http.get<QuoteReceipt>(`${this.apiUrl}/Quotes/Calculate/${this.createdQuoteId}`);
    }

}

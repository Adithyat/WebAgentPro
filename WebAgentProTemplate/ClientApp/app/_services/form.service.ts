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
  
    createdDriverId: number[]  = new Array();



    getQid() {
      return this.createdQuoteId;
    }
    setQId(id: number) {
      this.createdQuoteId = id;
    }

    getDid() {
      console.log(this.createdDriverId);
      return this.createdDriverId;

    }
    setDId(id: number) {

      this.createdDriverId.push(id);
      console.log(this.createdDriverId);
    }

    getCalculatedQuote() {
        return this.http.get<QuoteReceipt>(`${this.apiUrl}/Quotes/Calculate/${this.createdQuoteId}`);
    }

}

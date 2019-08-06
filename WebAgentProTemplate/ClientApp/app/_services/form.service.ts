import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { QuoteReceipt } from '../_models/quotereceipt';
import { Driver } from '../_models/driver';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

    createdQuoteId: number;
    apiUrl: string = environment.apiUrl;

    createdDrivers: Driver[] = new Array();



    getQid() {
      return this.createdQuoteId;
    }
    setQId(id: number) {
      this.createdQuoteId = id;
    }

    getDriver() {
      console.log(this.createdDrivers);
      return this.createdDrivers;

    }
    setDriver(newDriver: Driver) {

      this.createdDrivers.push(newDriver);
      console.log(this.createdDrivers);
    }

    getCalculatedQuote() {
        return this.http.get<QuoteReceipt>(`${this.apiUrl}/Quotes/Calculate/${this.createdQuoteId}`);
    }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  createdQuoteId: number;

    getQid() {
      return this.createdQuoteId;
    }
    setQId(id: number) {
      this.createdQuoteId = id;
    }


}

import { Injectable } from '@angular/core';
import { Discount } from '@app/_models/discount';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiUrl;

  getDiscount(stateCode){
    return this.http.get<Discount>(`${this.apiUrl}/Discounts/${stateCode}`);
  }

  putDiscount(put: Discount, stateCode) {
    //console.log(put);
    return this.http.put(`${this.apiUrl}/Discounts/${stateCode}`, put);
  }
}

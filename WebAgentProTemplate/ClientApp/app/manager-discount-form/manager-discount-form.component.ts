import { Component, OnInit } from '@angular/core';
import { Discount } from '@app/_models/discount';
import { DiscountService } from '@app/_services/discount.service';
import { AlertService } from '@app/_services/alert.service';

@Component({
  selector: 'app-manager-discount-form',
  templateUrl: './manager-discount-form.component.html',
  styleUrls: ['./manager-discount-form.component.css']
})
export class ManagerDiscountFormComponent implements OnInit {
  discount: Discount;


  constructor(private discountService: DiscountService, private alertService: AlertService) { }

  ngOnInit() {
    this.discount = new Discount;
    //this.discount.stateCode = '';
    //console.log(this.discount);
  }

  changeDropDown(stateCode) {
    console.log(stateCode);
    this.discountService.getDiscount(stateCode)
    .subscribe(
      returnedDiscount => {
        this.discount = returnedDiscount;
        console.log(returnedDiscount);
      });
  }

  saveDiscount(stateCode) {
    console.log(this.discount);
    this.discountService.putDiscount(this.discount, stateCode).subscribe(
      response => {
        console.log(response);
        // this.newQuote();
        this.alertService.success('Discount saved.', false);
      },
      error => {
        this.alertService.error('Discount save failed.', false);
      });
  }

}

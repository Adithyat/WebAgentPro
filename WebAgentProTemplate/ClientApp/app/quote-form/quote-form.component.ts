import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormCustomerComponent } from './form-customer/form-customer.component';
import { FormDriverComponent } from './form-driver/form-driver.component';
import { FormVehicleComponent } from './form-vehicle/form-vehicle.component';
import { FormSummaryComponent } from './form-summary/form-summary.component';




@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent implements OnInit {
  @ViewChild(FormCustomerComponent) customer: FormCustomerComponent;
  @ViewChild(FormDriverComponent) driver: FormDriverComponent;
  @ViewChild(FormVehicleComponent) vehicle: FormVehicleComponent;
  @ViewChild(FormSummaryComponent) summary: FormSummaryComponent;

  constructor() { }

  ngOnInit() {
    //this.form = this.FormDataService.getFormData();
  }
  goToDriver(){
    this.customer.save();
    this.driver.stepInit();
  }
  goToVehicle(){
    this.driver.saveDrivers();
    this.vehicle.stepInit();
  }
  goToSummary(){
    this.vehicle.saveVehicles();
    this.summary.stepInit();
  }


}

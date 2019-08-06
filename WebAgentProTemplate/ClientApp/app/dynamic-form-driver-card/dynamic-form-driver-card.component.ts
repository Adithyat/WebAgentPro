import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/_services';
import { DriverService } from '@app/_services/driver.service';
import { QuoteService } from '@app/_services/quote.service';
import { Driver } from '@app/_models/driver';
import { Quote } from '@app/_models/quote';

@Component({
  selector: 'app-dynamic-form-driver-card',
  templateUrl: './dynamic-form-driver-card.component.html',
  styleUrls: ['./dynamic-form-driver-card.component.css']
})
export class DynamicFormDriverCardComponent implements OnInit {
  driver: Driver = new Driver();
  constructor(private driverService: DriverService,
    private quoteService: QuoteService,
    private alertService: AlertService,

    ) { }

  ngOnInit() {
    this.createDriver();
  }

  createDriver() {
    this.driver = new Driver();
  }

  cancelCreate() {
      this.alertService.success('Driver creation cancelled.');
      this.resetEdit();
  }

  onSubmit() {
      //this.driver.quoteId = this.quoteService.getQid();
      //console.log(this.driver);
      if (/*this.driver.d_FirstName != null && this.driver.d_LastName != null && this.driver.d_ssn != null
          && this.driver.d_dateOfBirth != null && this.driver.driverLicenseNumber != null
          && this.driver.driverLicenseStateCode && this.driver.quoteId != null*/1) {
          //console.log('pass');

          this.saveCreate();
      }
  }

  saveCreate() {
      
      this.driverService.postDriver(this.driver, this.driver.quoteId).subscribe(
          returnedDriver => {
              console.log(returnedDriver);
              //this.quoteService.setDId(returnedDriver.driverId);
              //this.resetEdit();
              this.alertService.success('Driver Created.', false);
          },
          error => {
              this.alertService.error('Driver update failed.', false);
          });
  }

  resetEdit() {
     //this.quoteService.setQId(null);
      this.driver = new Driver;
  }

  cancelEdit() {
      this.alertService.success('Driver update cancelled.');
      this.resetEdit();
  }

}

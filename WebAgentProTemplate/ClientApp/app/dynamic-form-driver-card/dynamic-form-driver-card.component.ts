import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/_services';
import { DriversService } from '@app/_services/drivers.service';
import { QuotesService } from '@app/_services/quotes.service';
import { FormService } from '@app/_services/form.service';
import { Driver } from '@app/_models/driver';
import { Quote } from '@app/_models/quote';

@Component({
  selector: 'app-dynamic-form-driver-card',
  templateUrl: './dynamic-form-driver-card.component.html',
  styleUrls: ['./dynamic-form-driver-card.component.css']
})
export class DynamicFormDriverCardComponent implements OnInit {
  driver: Driver = new Driver();
  constructor(private driverService: DriversService,
    private quoteService: QuotesService,
    private alertService: AlertService,
    private formService: FormService,

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
      this.driver.quoteId = this.formService.getQid();
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
              this.formService.setDriver(returnedDriver);
              //this.resetEdit();
              this.alertService.success('Driver Created.', false);
          },
          error => {
              this.alertService.error('Driver update failed.', false);
          });
  }

  resetEdit() {
      this.formService.setQId(null);
      this.driver = new Driver;
  }

  cancelEdit() {
      this.alertService.success('Driver update cancelled.');
      this.resetEdit();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '@app/_services';
import { DriversService } from '@app/_services/drivers.service';
import { QuotesService } from '@app/_services/quotes.service';
import { Driver } from '@app/_models/driver';
import { Quote } from '@app/_models/quote';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-form-driver',
  templateUrl: './form-driver.component.html',
  styleUrls: ['./form-driver.component.css']
})
export class FormDriverComponent implements OnInit {
    @Input() createdQuoteId: number;
    driverEdit: Driver;
    quote: Quote;

    constructor(private service: DriversService, private quotesService: QuotesService, private alertService: AlertService) { }

    ngOnInit() {
        this.createDriver();
    }
    createDriver() {
        this.driverEdit = new Driver();
    }

    cancelCreate() {
        this.alertService.success('Driver creation cancelled.');
        this.resetEdit();
    }

    onSubmit() {
        console.log(this.createdQuoteId);
        this.driverEdit.quoteId = this.createdQuoteId;
        if (/*this.driverEdit.driverId != null &&*/ this.driverEdit.d_FirstName != null
            && this.driverEdit.d_LastName != null && this.driverEdit.d_ssn != null
            && this.driverEdit.d_DateOfBirth != null && this.driverEdit.driverLicenseNumber != null
            && this.driverEdit.driverLicenseStateCode && this.driverEdit.quoteId != null) {
            console.log('pass');
            
            this.saveCreate();
        }
    }

    saveCreate() {
        this.service.postDriver(this.driverEdit, this.driverEdit.quoteId).subscribe(
            returnedDriver => {
                console.log(returnedDriver);
                console.log(this.driverEdit);
                this.resetEdit();
                this.alertService.success('Driver Created.', false);
            },
            error => {
                this.alertService.error('Driver update failed.', false);
            });
    }

    resetEdit() {
        this.driverEdit = new Driver;
    }

    cancelEdit() {
        this.alertService.success('Driver update cancelled.');
        this.resetEdit();
    }

}

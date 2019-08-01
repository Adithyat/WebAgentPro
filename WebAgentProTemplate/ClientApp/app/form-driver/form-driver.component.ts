import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/_services';
import { DriversService } from '@app/_services/drivers.service';
//import { QuotesService } from '@app/_services/quotes.service';
import { Driver } from '@app/_models/driver';
//import { Quote } from '@app/_models/quote';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-form-driver',
  templateUrl: './form-driver.component.html',
  styleUrls: ['./form-driver.component.css']
})
export class FormDriverComponent implements OnInit {
    drivers: Driver[];
    driverEdit: Driver;
    //quote: Quote;

    constructor(private service: DriversService, private alertService: AlertService) { }

    get editing(): boolean {
        return (this.driverEdit != null);
    }

    ngOnInit() {
        this.getDrivers();
    }

    getDrivers() {
        this.service.getDrivers().subscribe(returnedDrivers => { this.drivers = returnedDrivers });
    }


   

    createDriver() {
        this.driverEdit = new Driver();
    }

    editDriver(id: number) {
        this.service.getDriver(id).subscribe(
            returnedDriver => {
                this.driverEdit = returnedDriver;
            });
    }

    deleteDriver(id: number) {
        this.service.deleteDriver(id).subscribe(
            success => {
                this.alertService.success("Driver deleted successfully.");
                this.getDrivers();
            }
        )
    }

    cancelEdit() {
        this.alertService.success('Driver update cancelled.');
        this.resetEdit();
    }

    cancelCreate() {
        this.alertService.success('Driver creation cancelled.');
        this.resetEdit();
    }

    onSubmit() {
        if (!this.driverEdit.driverId) {
            this.saveCreate();
        }
        else {
            this.saveEdit();
        }
        /*
        if (this.driverEdit.driverId != null && this.driverEdit.d_FirstName != null
            && this.driverEdit.d_LastName != null && this.driverEdit.d_ssn != null
            && this.driverEdit.d_dateOfBirth != null && this.driverEdit.driverLicenseNumber != null
            && this.driverEdit.driverLicenseStateCode && this.quotesService.getQC()) {
            console.log('pass');
            this.saveCreate();
            
        }*/
    }

    saveEdit() {
        this.service.putDriver(this.driverEdit).pipe(first()).subscribe(
            success => {
                this.resetEdit();
                this.getDrivers();
                this.alertService.success("Driver Updated.", false);
            },
            error => {
                this.alertService.error("Driver update failed.", false);
            })
    }

    saveCreate() {
        
        this.service.postDriver(this.driverEdit).pipe(first()).subscribe(
            returnedDriver => {
                this.resetEdit();
                this.getDrivers();
                this.alertService.success('Driver Created.', false);
            },
            error => {
                this.alertService.error('Driver update failed.', false);
            });
    }

    resetEdit() {
        this.driverEdit = null;
    }



}

import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '@app/_services';
import { VehiclesService } from '@app/_services/vehicles.service';
import { QuotesService } from '@app/_services/quotes.service';
import { Vehicle } from '@app/_models/vehicle';
import { Quote } from '@app/_models/quote';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
})
export class FormVehicleComponent implements OnInit {
    @Input() createdQuoteId: number;
    vehicleEdit: Vehicle;
    quote: Quote;

    constructor(private service: VehiclesService, private quotesService: QuotesService, private alertService: AlertService) { }

    ngOnInit() {
        this.createVehicle();
    }

    createVehicle() {
        this.vehicleEdit = new Vehicle();
    }

    cancelCreate() {
        this.alertService.success('Vehicle creation cancelled.');
        this.resetEdit();
    }

    onSubmit() {
        console.log(this.createdQuoteId);
        this.vehicleEdit.quoteId = this.createdQuoteId;
        //if (/*this.driverEdit.driverId != null &&*/ this.driverEdit.d_FirstName != null
            //&& this.driverEdit.d_LastName != null && this.driverEdit.d_ssn != null
            //&& this.driverEdit.d_dateOfBirth != null && this.driverEdit.driverLicenseNumber != null
            //&& this.driverEdit.driverLicenseStateCode && this.driverEdit.quoteId != null) {
            //console.log('pass');

            this.saveCreate();
        //}
    }

    saveCreate() {
        this.service.postVehicle(this.vehicleEdit).subscribe(
            returnedDriver => {
                console.log(this.vehicleEdit);
                this.resetEdit();
                this.alertService.success('Vehicle Created.', false);
            },
            error => {
                this.alertService.error('Vehicle update failed.', false);
            });
    }

    resetEdit() {
        this.vehicleEdit = new Vehicle;
    }

    cancelEdit() {
        this.alertService.success('Vehicle update cancelled.');
        this.resetEdit();
    }

}

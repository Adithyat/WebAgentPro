import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '@app/_services';
import { VehiclesService } from '@app/_services/vehicles.service';
import { QuotesService } from '@app/_services/quotes.service';
import { Vehicle } from '@app/_models/vehicle';
import { Quote } from '@app/_models/quote';
import { Driver } from '@app/_models/driver';
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
    drivers: Driver[] = [];
    

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
        if (this.vehicleEdit.quoteId != null && this.vehicleEdit.primaryDriver != null
            && this.vehicleEdit.vin != null && this.vehicleEdit.make != null
            && this.vehicleEdit.model != null && this.vehicleEdit.year != null
            && this.vehicleEdit.annualMileage && this.vehicleEdit.daysDrivenPerWeek != null
            && this.vehicleEdit.milesDrivenToWork && this.vehicleEdit.currentValue != null) {
            console.log('pass');

            this.saveCreate();
        }
    }

    saveCreate() {
        this.service.postVehicle(this.vehicleEdit).subscribe(
            returnedVehicle => {
                console.log(returnedVehicle);
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

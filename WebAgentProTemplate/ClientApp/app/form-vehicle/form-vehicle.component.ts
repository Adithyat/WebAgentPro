import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '@app/_services';
import { VehiclesService } from '@app/_services/vehicles.service';
import { FormService } from '@app/_services/form.service';
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
    vehicleEdit: Vehicle;
    Did: number[]= new Array();
    constructor(
        private vehicleService: VehiclesService, 
        private formService: FormService, 
        private alertService: AlertService) { }

    ngOnInit() {
        this.createVehicle();
        this.Did = this.formService.getDid();
        console.log(this.Did);
    }

    createVehicle() {
        this.vehicleEdit = new Vehicle();
    }

    cancelCreate() {
        this.alertService.success('Vehicle creation cancelled.');
        this.resetEdit();
    }
    /*
    onSubmit() {
        console.log(this.createdQuoteId);
        this.vehicleEdit.quoteId = this.createdQuoteId;
        if (this.vehicleEdit.quoteId != null && this.vehicleEdit.driverId != null
            && this.vehicleEdit.vin != null && this.vehicleEdit.make != null
            && this.vehicleEdit.model != null && this.vehicleEdit.year != null
            && this.vehicleEdit.annualMileage && this.vehicleEdit.daysDrivenPerWeek != null
            && this.vehicleEdit.milesDrivenToWork && this.vehicleEdit.currentValue != null) {
            console.log('pass');

            this.saveCreate();
        }
    }*/

    saveCreate() {
        this.vehicleEdit.quoteId = this.formService.getQid();
        //this.vehicleEdit.driverId = this.formService.getDid();

        //console.log(this.vehicleEdit);
        this.vehicleService.postVehicle(this.vehicleEdit, this.vehicleEdit.quoteId).subscribe(
            returnedVehicle => {
                console.log(returnedVehicle);
                this.resetEdit();
                this.alertService.success('Vehicle Created.', false);
            },
            error => {
                this.alertService.error('Vehicle update failed.', false);
            });
    }

    UpperCase(x) {
        x = x.toUpperCase();
    }

    resetEdit() {
        this.vehicleEdit = new Vehicle;
    }

    cancelEdit() {
        this.alertService.success('Vehicle update cancelled.');
        this.resetEdit();
    }

}

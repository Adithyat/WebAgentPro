import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '@app/_services';
import { QuoteService } from '@app/_services/quote.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehicle } from '@app/_models/vehicle';
import { Quote } from '@app/_models/quote';

@Component({
  selector: 'app-form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
})
export class FormVehicleComponent implements OnInit {
    quote: Quote = new Quote;
    private quoteIdSubscription: Subscription;


    constructor(
        private quoteService: QuoteService,  
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        //this.createVehicle();
        //this.Did = this.quoteService.getDid();
        //console.log(this.Did);
    }
    stepInit(){
        this.quoteIdSubscription = this.route.queryParams.subscribe(
            params => {
                // this.widgetID = +params['id'];
                this.quote.quoteId = +params['id'] || null;
                console.log(this.quote.quoteId);
                if (this.quote.quoteId) {
                  // this.editQuote();
                  this.getVehicles();

                } else {
                  // this.newQuote();
                  this.router.navigate(['/quotes']);
                }
            });
    }
    
    getVehicles(){
        this.quoteService.getQuote(this.quote.quoteId)
        .subscribe(
          returnedQuote => {
            this.quote = returnedQuote;
            if (returnedQuote.quoteVehicles.length !== 0) {
                //console.log(returnedQuote.quoteVehicles.length);
                // this.quote.quoteDrivers.push.apply(returnedQuote.quoteDrivers);
            } else {
                this.addVehicle();
            }

            // console.log(returnedQuote.q_DateOfBirth);
          });
    }

    addVehicle() {
        const vehicle = new Vehicle;
        this.quote.quoteVehicles.push(vehicle);
    }

    removeVehicle(vehicle, i) {
        this.quote.quoteVehicles.splice(i, 1);
        if (vehicle.vehicleId != null) {
            this.quoteService.deleteVehicle(vehicle.vehicleId).subscribe(
                response => {
                    this.alertService.success('Vehicle Removed.', false);
                },
                error => {
                    this.alertService.error('Vehicle Remove Failed.', false);
                });
        }
    }

    saveVehicles() {
        console.log(this.quote.quoteVehicles);
        this.quoteService.putQuote(this.quote, this.quote.quoteId).subscribe(
            response => {
              console.log(response);
              // this.newQuote();
                this.alertService.success('Vehicle saved.', false);
                this.quote = response;
                console.log(this.quote.quoteVehicles);
            },
            error => {
              this.alertService.error('Vehicle save failed.', false);
            });
    }

    /*
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
        if (this.vehicleEdit.quoteId != null && this.vehicleEdit.driverId != null
            && this.vehicleEdit.vin != null && this.vehicleEdit.make != null
            && this.vehicleEdit.model != null && this.vehicleEdit.year != null
            && this.vehicleEdit.annualMileage && this.vehicleEdit.daysDrivenPerWeek != null
            && this.vehicleEdit.milesDrivenToWork && this.vehicleEdit.currentValue != null) {
            console.log('pass');

            this.saveCreate();
        }
    }

    saveCreate() {
        //this.vehicleEdit.quoteId = this.quoteService.getQid();
        //this.vehicleEdit.driverId = this.quoteService.getDid();

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
    }*/

}

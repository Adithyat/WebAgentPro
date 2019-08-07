import { Component } from '@angular/core';
import { QuoteService } from '@app/_services/quote.service';
import { AlertService } from '@app/_services/alert.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Quote } from '@app/_models/quote';
import { Driver } from '@app/_models/driver';




/*
import { first } from 'rxjs/operators';
import { DynamicFormDriverCardComponent } from '../../dynamic-form-driver-card/dynamic-form-driver-card.component';
import { SectionComponent } from '../../section.component';
import { Inject, ViewContainerRef, ViewChild, NgModule} from '@angular/core';
*/
@Component({
  selector: 'app-form-driver',
  templateUrl: './form-driver.component.html',
  styleUrls: ['./form-driver.component.css']
})
export class FormDriverComponent {
    // @Input() createdQuoteId: number;
    quote: Quote = new Quote;
    // drivers: Driver[] = [];
    private quoteIdSubscription: Subscription;

    /*
    @ViewChildren(SectionComponent) sections: QueryList<SectionComponent>;
      activeSections: SectionComponent[];
      textComponentFactory: ComponentFactory<DynamicFormDriverCardComponent>;
    */
    constructor(private quoteService: QuoteService,
                private alertService: AlertService,
                private router: Router,
                private route: ActivatedRoute
                // private componentFactoryResolver: ComponentFactoryResolver,
                ) {}

    ngOnInit() {

        // this.textComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicFormDriverCardComponent);

        // this.onAddComponentClick();
        // this.createDriver();
    }

    stepInit() {
        this.quoteIdSubscription = this.route.queryParams.subscribe(
            params => {
                // this.widgetID = +params['id'];
                this.quote.quoteId = +params['id'] || null;
                console.log(this.quote.quoteId);
                if (this.quote.quoteId) {
                  // this.editQuote();
                  this.getDrivers();

                } else {
                  // this.newQuote();
                  this.router.navigate(['/quotes']);
                }
            });
    }
    getDrivers() {
        this.quoteService.getQuote(this.quote.quoteId)
        .subscribe(
          returnedQuote => {
            console.log(returnedQuote);
            this.quote = returnedQuote;
            if (returnedQuote.quoteDrivers.length !== 0) {
                //console.log(returnedQuote.quoteDrivers.length);
                // this.quote.quoteDrivers.push.apply(returnedQuote.quoteDrivers);
            } else {
                this.addDriver();
            }

            // console.log(returnedQuote.q_DateOfBirth);
          });
    }
    addDriver() {
        const driver = new Driver;
        this.quote.quoteDrivers.push(driver);
    }

    removeDriver(i) {
        this.quote.quoteDrivers.splice(i, 1);
    }

    saveDrivers() {

        console.log('saveDrivers');
        this.quoteService.putQuote(this.quote, this.quote.quoteId).subscribe(
            response => {
              console.log(response);
              // this.newQuote();
              this.alertService.success('Driver saved.', false);
            },
            error => {
              this.alertService.error('Driver save failed.', false);
            });
    }


    /*
    ngAfterViewInit() {
        this.activeSections = this.sections.reduce((result, section, index) => {
          if(section.active) {
            result.push(section);
          }
          return result;
        }, []);
      }

    onAddComponentClick() {
    this.activeSections.forEach((section) => {
        section.viewContainerRef.createComponent(this.textComponentFactory);
    });
    }
    */
    /*
    createDriver() {
        // this.drivers[1] = new Driver();
    }

    cancelCreate() {
        this.alertService.success('Driver creation cancelled.');
        this.resetEdit();
    }

    onSubmit() {
        this.driverEdit.quoteId = this.quoteService.getQid();
        console.log(this.driverEdit);
        if (/*this.driverEdit.d_FirstName != null && this.driverEdit.d_LastName != null && this.driverEdit.d_ssn != null
            && this.driverEdit.d_dateOfBirth != null && this.driverEdit.driverLicenseNumber != null
            && this.driverEdit.driverLicenseStateCode && this.driverEdit.quoteId != null1) {
            console.log('pass');

            this.saveCreate();
        }
    }

    saveCreate() {
        this.driverService.postDriver(this.driverEdit, this.driverEdit.quoteId).subscribe(
            returnedDriver => {
                console.log(returnedDriver);
                this.resetEdit();
                this.alertService.success('Driver Created.', false);
            },
            error => {
                this.alertService.error('Driver update failed.', false);
            });
    }

    resetEdit() {
        this.quoteService.setQId(null);
        this.driverEdit = new Driver;
    }

    cancelEdit() {
        this.alertService.success('Driver update cancelled.');
        this.resetEdit();
    }
    */

}

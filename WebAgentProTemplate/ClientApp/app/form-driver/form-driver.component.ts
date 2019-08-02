import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef, ComponentFactoryResolver, ComponentFactory, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertService } from '@app/_services';
import { DriversService } from '@app/_services/drivers.service';
import { FormService }from '@app/_services/form.service';
import { Driver } from '@app/_models/driver';
import { Quote } from '@app/_models/quote';
import { first } from 'rxjs/operators';


import { DynamicFormDriverCardComponent } from '../dynamic-form-driver-card/dynamic-form-driver-card.component';
import { SectionComponent } from '../section.component';

import {
    Inject,
    ViewContainerRef,
    ViewChild,
    NgModule
  } from '@angular/core';

@Component({
  selector: 'app-form-driver',
  templateUrl: './form-driver.component.html',
  styleUrls: ['./form-driver.component.css']
})
export class FormDriverComponent implements AfterViewInit, OnInit {
    // @Input() createdQuoteId: number;
    drivers: Driver[];
    driverEdit: Driver;
    quote: Quote;

    @ViewChildren(SectionComponent) sections: QueryList<SectionComponent>;
      activeSections: SectionComponent[];
      textComponentFactory: ComponentFactory<DynamicFormDriverCardComponent>;

    constructor(private driverService: DriversService,
                private alertService: AlertService,
                private componentFactoryResolver: ComponentFactoryResolver,
                private formService: FormService
                ){}

    ngOnInit() {
        this.textComponentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicFormDriverCardComponent);
        
        //this.onAddComponentClick();
        //this.createDriver();
    }

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

    /*
    createDriver() {
        // this.drivers[1] = new Driver();
    }

    cancelCreate() {
        this.alertService.success('Driver creation cancelled.');
        this.resetEdit();
    }

    onSubmit() {
        this.driverEdit.quoteId = this.formService.getQid();
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
        this.formService.setQId(null);
        this.driverEdit = new Driver;
    }

    cancelEdit() {
        this.alertService.success('Driver update cancelled.');
        this.resetEdit();
    }
    */

}

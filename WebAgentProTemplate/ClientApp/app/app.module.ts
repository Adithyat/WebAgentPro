import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ManagerDiscountFormComponent } from '@app/manager-discount-form/manager-discount-form.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule, MatStepperIntl} from '@angular/material/stepper';

import { AppComponent }  from './app.component';

import { AppRoutingModule }        from './app.routing';

import { AlertComponent } from './_components';
import { NgxPaginationModule } from 'ngx-pagination'; 

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { UsersComponent } from './users';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetPartsComponent } from './widget-parts/widget-parts.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListQuotesComponent } from './list-quotes/list-quotes.component';
import { FilterQuotesComponent } from './filter-quotes/filter-quotes.component';

import { QuoteFormComponent } from './quote-form/quote-form.component';
import { FormCustomerComponent } from './quote-form/form-customer/form-customer.component';
import { FormDriverComponent } from './quote-form/form-driver/form-driver.component';
import { FormVehicleComponent } from './quote-form/form-vehicle/form-vehicle.component';
import { FormNavbarComponent } from './quote-form/form-navbar/form-navbar.component';

import { SectionComponent } from './section.component';
import { FormSummaryComponent } from './quote-form/form-summary/form-summary.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { UserComponent } from './user/user.component';

import { MaterialModule } from './material.module';
import { ViewQuoteComponent } from './view-quote/view-quote.component';

 
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule, 
        MatCheckboxModule,
        MatStepperModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        AngularFontAwesomeModule,
        AppRoutingModule,
        MaterialModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        UsersComponent,
        RegisterComponent,
        WidgetsComponent,
        WidgetPartsComponent,
        ListQuotesComponent,
        FormCustomerComponent,
        FormDriverComponent,
        SectionComponent,
        FormVehicleComponent,
        FormSummaryComponent,
        QuoteFormComponent,
        FormNavbarComponent,
        FilterQuotesComponent,
        QuoteFormComponent,
        ManagerDiscountFormComponent,
        UserComponent,
        DashboardsComponent,
        ViewQuoteComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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

import { ListQuotesComponent } from './list-quotes/list-quotes.component';
import { FilterQuotesComponent } from './filter-quotes/filter-quotes.component';

import { FormQuotesComponent } from './form-quotes/form-quotes.component';
import { FormDriverComponent } from './form-driver/form-driver.component';
import { FormVehicleComponent } from './form-vehicle/form-vehicle.component';
import { FormShellComponent } from './form-shell/form-shell.component';
import { FormNavbarComponent } from './form-navbar/form-navbar.component';

import { QuoteProgressComponent } from './quote-progress/quote-progress.component';
import { DynamicFormDriverCardComponent } from './dynamic-form-driver-card/dynamic-form-driver-card.component';
import { SectionComponent } from './section.component';
import { FormSummaryComponent } from './form-summary/form-summary.component';
import { ManagerDiscountFormComponent } from './manager-discount-form/manager-discount-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

 
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        AngularFontAwesomeModule,
        AppRoutingModule,
        BrowserAnimationsModule,
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
        FormQuotesComponent,
        FormDriverComponent,
        QuoteProgressComponent,
        DynamicFormDriverCardComponent,
        SectionComponent,
        FormVehicleComponent,
        FormSummaryComponent,
        FormShellComponent,
        FormNavbarComponent,
        FilterQuotesComponent,
        ManagerDiscountFormComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    entryComponents: [DynamicFormDriverCardComponent]
})

export class AppModule { }

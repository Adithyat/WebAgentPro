import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

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

import { FormQuotesComponent } from './form-quotes/form-quotes.component';
import { FormDriverComponent } from './form-driver/form-driver.component';
import { FormVehicleComponent } from './form-vehicle/form-vehicle.component';

import { QuoteProgressComponent } from './quote-progress/quote-progress.component';
import { DynamicFormDriverCardComponent } from './dynamic-form-driver-card/dynamic-form-driver-card.component';
import { ToolbarComponent } from './toolbar.component';
import { SectionComponent } from './section.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        AngularFontAwesomeModule,
        routing
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
        ToolbarComponent,
        SectionComponent,
        FormVehicleComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    entryComponents: [DynamicFormDriverCardComponent]
})

export class AppModule { }

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { UsersComponent } from './users';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { Role } from './_models';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetPartsComponent } from './widget-parts/widget-parts.component';
import { ListQuotesComponent } from './list-quotes/list-quotes.component';
import { FormShellComponent } from './form-shell/form-shell.component';
import { FormQuotesComponent } from './form-quotes/form-quotes.component';
import { FormDriverComponent } from './form-driver/form-driver.component';
import { FormVehicleComponent } from './form-vehicle/form-vehicle.component';
import { FormSummaryComponent } from './form-summary/form-summary.component';
import { ManagerDiscountFormComponent } from './manager-discount-form/manager-discount-form.component';
import { NgModule } from '@angular/core';



const appRoutes: Routes = [
    { path: '',         component: HomeComponent,   canActivate: [AuthGuard] },
    { path: 'widgets', component: WidgetsComponent, canActivate: [AuthGuard] },
    { path: 'widget-parts/:id', component: WidgetPartsComponent, canActivate: [AuthGuard] },
    { path: 'all-quotes', component: ListQuotesComponent, canActivate: [AuthGuard] },
    { 
        path: 'new-quote', 
        component: FormShellComponent, 
        canActivate: [AuthGuard],
        children: [
            { path: '', outlet: 'form', component: FormQuotesComponent, canActivate: [AuthGuard] },
            { path: 'quotes', outlet: 'form', component: FormQuotesComponent, canActivate: [AuthGuard] },
            { path: 'drivers', outlet: 'form', component: FormDriverComponent, canActivate: [AuthGuard] },
            { path: 'vehicles', outlet: 'form', component: FormVehicleComponent, canActivate: [AuthGuard] },
            { path: 'summary', outlet: 'form', component: FormSummaryComponent, canActivate: [AuthGuard] },
            { path: '**', redirectTo: '' }
        ]
    },
   


    //{ path: 'add-drivers', component: FormDriverComponent, canActivate: [AuthGuard] },
    { path: 'users',    component: UsersComponent,  canActivate: [AuthGuard], data: { roles: [Role.Manager] }},
    { path: 'login',    component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'manage-discounts', component: ManagerDiscountFormComponent }
    // otherwise redirect to home
    //{ path: '**', redirectTo: '' }
];


@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

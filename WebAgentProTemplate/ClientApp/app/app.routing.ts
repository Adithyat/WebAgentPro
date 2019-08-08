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
import { QuoteFormComponent } from './quote-form/quote-form.component';
import { ManagerDiscountFormComponent } from './manager-discount-form/manager-discount-form.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { NgModule } from '@angular/core';



const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'dashboards', component: DashboardsComponent, canActivate: [AuthGuard] },
    { path: 'widgets', component: WidgetsComponent, canActivate: [AuthGuard] },
    { path: 'widget-parts/:id', component: WidgetPartsComponent, canActivate: [AuthGuard] },
    { path: 'all-quotes', component: ListQuotesComponent, canActivate: [AuthGuard] },
    { path: 'quotes', component: QuoteFormComponent, canActivate: [AuthGuard]},
    //{path: 'quotes/:id', component: QuoteFormComponent, canActivate: [AuthGuard]},
    // { path: 'add-drivers', component: FormDriverComponent, canActivate: [AuthGuard] },
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

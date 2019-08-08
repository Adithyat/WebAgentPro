import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from './_services';
import { User, Role } from './_models';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({ selector: 'app', templateUrl: 'app.component.html', styleUrls: ['./app.component.css'] })
export class AppComponent {
    currentUser: User;
    show: Boolean = true;
    navbarOpen: Boolean = false;

    constructor(
        public dialog: MatDialog,
        private router: Router,
        private accountService: AccountService,
       // public dialogRef: MatDialogRef<AppComponent>
    ) {
        this.accountService.currentUser.subscribe(x => this.currentUser = x);
    }

    get isManager() {
        return this.currentUser && this.currentUser.roles.includes(Role.Manager);
    }

    openDialog(): void {
        this.show = !this.show;

    }
    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }
    onNoClick(): void {
        this.show = !this.show;
    }
    logout() {
        this.accountService.logout();
        this.router.navigate(['/login']);
    }
}

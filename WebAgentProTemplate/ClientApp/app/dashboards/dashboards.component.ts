import { Component, OnInit } from '@angular/core';

import { AccountService } from '../_services';
import { User, Role } from '../_models';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

    currentUser: User;

    constructor(private accountService: AccountService) {
        this.accountService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
  }

    get isManager() {
        return this.currentUser && this.currentUser.roles.includes(Role.Manager);
    }

    get isAgent() {
        return this.currentUser && this.currentUser.roles.includes(Role.Agent);
    }

}

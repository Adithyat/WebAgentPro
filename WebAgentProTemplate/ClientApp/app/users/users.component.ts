import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';
import {Role} from '@app/_models/role';

@Component({ templateUrl: 'users.component.html' })
export class UsersComponent implements OnInit {
    users: User[] = [];
    filteredUsers: User[] = [];
    _listFilter = '';
  
    p: number;
    userFilter = '';

    constructor(
      private userService: UserService
    ) {

    }

    ngOnInit() {
        this.getAllUsers();
    }

    getAllUsers() {
      this.userService.getAllUsers().subscribe(returnedUsers => {
        this.users = returnedUsers;
        this.filteredUsers = this.users;
        console.log(this.users);
      });
    }

    saveStatus() {
    }


    approve() {
      this.userService.patchAll().subscribe(returnedUsers => {
        console.log('approved');
      });
      this.getAllUsers();

    }




    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredUsers = this.listFilter ? this.performFilter(this.listFilter) : this.users;
      // console.log(this.filteredQuotes);
    }
  
    performFilter(filterBy: string): User[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.users.filter((user: User) =>
      (user.u_FirstName !== null && user.u_FirstName.toLocaleLowerCase().indexOf(filterBy) !== -1
        || user.u_LastName !== null && user.u_LastName.toLocaleLowerCase().indexOf(filterBy) !== -1
        || (user.u_FirstName + ' ' + user.u_LastName) !== null && (user.u_FirstName + ' ' + user.u_LastName).toLocaleLowerCase().indexOf(filterBy) !== -1
        || user.userName !== null && user.userName.indexOf(filterBy) !== -1
        ));
      // || (user.u_LastName !== null && user.u_LastName.toLocaleLowerCase().indexOf(filterBy) !== -1))
  
    }

    userFilterChanged = (roleStatusSelection: string): void => {
      this.userFilter = roleStatusSelection;
      this.populateUserList();
    }

    populateUserList = (): void => {
      if (this.userFilter) {
        this.userService.getFiltered(this.userFilter).pipe(first()).subscribe(users => {
          this.users = users;
        });
      }
      else {
        this.userService.getAll().pipe(first()).subscribe(users => {
          this.users = users;
        });
      }
    }

  getRoleStatus = (selectedUser: User): string => {
    if (!selectedUser.isActive) { return 'Inactive'; }
    if (selectedUser.role && selectedUser.roles.length > 0) { return selectedUser.roles[0]; }
    return 'Active';
  }

  changeRole(role, index){
    this.users[index].role = role;
    this.userService.putUser(this.users[index], this.users[index].id).subscribe(returnedUser => {
      console.log('response');
    });
  }
  changeStatus(status, index){
    this.users[index].userStatus = status;
    this.userService.putUser(this.users[index],this.users[index].id).subscribe(returnedUser => {
      console.log('response');
    });

  }



  setLocalStatusRole = (selectedUser: User, roleStatusSelection: string): void => {
    selectedUser.roles.length = 0;
    if (roleStatusSelection === 'Inactive') {
      selectedUser.isActive = false;
      return;
    }
    selectedUser.isActive = true;
    selectedUser.roles.push(roleStatusSelection as Role);
  }

  updateStatusRoleToServer = (selectedUserName: string, roleStatusSelection: string): void => {
    this.userService.setUserStatusRole(selectedUserName, roleStatusSelection)
      .pipe(first())
      .subscribe(
        data => {
         // this.alertService.success('Registration successful', true);
         // this.router.navigate(['/login']);
        },
        error => {
          // this.alertService.error(error);
        });
  }


  roleStatusChanged = (selectedUser: User, roleStatusSelection: string): void => {
    this.setLocalStatusRole(selectedUser, roleStatusSelection);
    this.updateStatusRoleToServer(selectedUser.userName, roleStatusSelection);
  }



}

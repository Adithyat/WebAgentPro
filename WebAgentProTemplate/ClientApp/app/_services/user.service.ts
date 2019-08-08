import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getFiltered(userStatusRole : string) {
    return this.http.get<User[]>(`${environment.apiUrl}/users/getFilteredUsers?userStatusRole=${userStatusRole}`);
  }

  getAllUsers(){
    return this.http.get<User[]>(`${environment.apiUrl}/account/users`);
  }
  
  putUser(user: User, id: string){
    return this.http.put(`${environment.apiUrl}/account/users/${id}`, user);
  }

  patchAll(){
    return this.http.get(`${environment.apiUrl}/account/approve/pending`);
  }

  setUserStatusRole(selectedUserName: string, roleStatusSelection: string) {
    const body = {
      userName: selectedUserName, 
      statusRole: roleStatusSelection
    };
    return this.http.post(`${environment.apiUrl}/users/setUserStatusRole`,body);
  }
}

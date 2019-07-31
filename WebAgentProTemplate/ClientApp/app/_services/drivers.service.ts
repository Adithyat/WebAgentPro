import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Driver } from '@app/_models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

    constructor(private http: HttpClient) { }

    apiUrl: string = environment.apiUrl;

    getDrivers() {
        return this.http.get<Driver[]>(`${this.apiUrl}/Drivers`);
    }

    postDriver(driver: Driver) {
        console.log(driver);
        return this.http.post<Driver>(`${this.apiUrl}/Drivers`, driver);
    }

    deleteDriver(id: number) {
        return this.http.delete(`${this.apiUrl}/Drivers/${id}`);
    }
}

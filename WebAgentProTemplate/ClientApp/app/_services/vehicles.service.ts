import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Vehicle } from '@app/_models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

    constructor(private http: HttpClient) { }

    apiUrl: string = environment.apiUrl;

    getVehicles() {
        return this.http.get<Vehicle[]>(`${this.apiUrl}/Vehicles`);
    }

    getVehicle(id: number) {
        return this.http.get<Vehicle>(`${this.apiUrl}/Vehicles/${id}`);
    }

    putVehicle(vehicle: Vehicle) {
        return this.http.put(`${this.apiUrl}/Vehicles/${vehicle.vehicleId}`, vehicle);
    }

    postVehicle(vehicle: Vehicle) {
        console.log(vehicle);
        return this.http.post<Vehicle>(`${this.apiUrl}/Vehicles`, vehicle);
    }

    deleteVehicle(id: number) {
        return this.http.delete(`${this.apiUrl}/Vehicles/${id}`);
    }
}

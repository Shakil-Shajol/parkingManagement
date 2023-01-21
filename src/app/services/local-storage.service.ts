import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Database } from '../models/database';
import { VehicleType } from '../models/vehicle-type.model';
import { Vehicle } from '../models/vehicle.model';

@Injectable({providedIn: 'root'})
export class LocalStorageService {
  data: Database;
  constructor() {
    this.data = new Database();
    this.getData();
  }

  private getData(){
    const lsData = localStorage.getItem('storage-data');
    if(lsData != null|| lsData != undefined || lsData == ''){
      this.data = JSON.parse(lsData);
    } else {
      this.data = new Database();
    }
  }

  private setData() {
    const lsData = JSON.stringify(this.data);
    localStorage.setItem('storage-data', lsData);
  }
  getVehicle(): Observable<Vehicle[]> {
    this.getData();
    const vehicle = this.data.vehicles;
    return of(vehicle);
  }
  getVehicleById(id: number): Observable<Vehicle> {
    this.getData();
    const vehicle = this.data.vehicles.filter(x=> x.id === id);
    return vehicle.length> 0 ? of(vehicle[0]):of(new Vehicle);
  }

  addVehicle(vehicle: Vehicle): Observable<any> {
    this.getData();
    const vehicletype= this.data.vehicleTypes.filter(x=> x.id == vehicle.typeId);
    if(vehicletype.length > 0){
      vehicle.id = this.data.getMaxVehicleId();
      vehicle.type = vehicletype[0];
      this.data.vehicles.push(vehicle);
      this.setData();
      return of(true);
    }
    return of(false);
  }

  updateVehicle(vehicle: Vehicle): Observable<any> {
    this.getData();
    const vehicletype= this.data.vehicleTypes.filter(x=> x.id == vehicle.typeId);
    if(vehicletype.length > 0){
      vehicle.type = vehicletype[0];
      const index = this.data.vehicles.findIndex(x=> x.id == vehicle.id);
      this.data.vehicles[index] = vehicle;
      this.setData();
      return of(true);
    }
    return of(false);
  }

  getVehicleTypes(): Observable<VehicleType[]> {
    this.getData();
    const vehicleTypes = this.data.vehicleTypes;
    return of(vehicleTypes);
  }
}

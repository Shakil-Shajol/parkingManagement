import { VehicleType } from "./vehicle-type.model";
import { Vehicle } from "./vehicle.model";

export class Database{
  constructor() {
    this.vehicles =[];
    this.vehicleTypes=[];
    this.vehicleTypes.push({ id: 1, typeName: 'Car', parkingCharge: 100 });
    this.vehicleTypes.push({ id: 2, typeName: 'Microbus', parkingCharge: 200 });
    this.vehicleTypes.push({ id: 3, typeName: 'truck', parkingCharge: 500 });
  }

  vehicles: Vehicle[];
  vehicleTypes: VehicleType[];

  getMaxVehicleId(): number{
   const ids: number[]=[];
   this.vehicles.forEach(x=>  ids.push(x.id));
   if(ids.length > 0){
    return ids.reduce((item, curr)=> {
     return item>curr? item: curr;
    })
   } else {
    return 0;
   }
  }
}

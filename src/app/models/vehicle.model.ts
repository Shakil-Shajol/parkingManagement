
import { VehicleType } from "./vehicle-type.model";

export class Vehicle{
  constructor(){
    this.id=0;
    this.typeId=0;
    this.licenseNumber='';
    this.ownerName='';
    this.status = 'out';
    this.type = new VehicleType();
    this.phone='';
    this.address = '';
  }
  id: number;
  licenseNumber: string;
  ownerName: string;
  phone: string;
  address: string;
  typeId: number;
  type: VehicleType;
  status: string;
  entryTime!: Date;
  exitTime!: Date;

}

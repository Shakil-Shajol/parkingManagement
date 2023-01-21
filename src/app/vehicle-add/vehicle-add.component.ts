import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleType } from '../models/vehicle-type.model';
import { Vehicle } from '../models/vehicle.model';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.scss']
})
export class VehicleAddComponent implements OnInit {

  @Input() id: number= 0;
  @Output() saveVehilce: EventEmitter<Vehicle>= new EventEmitter<Vehicle>();
  vehicleForm: FormGroup;
  vehicleTypes: VehicleType[]=[];
  statusList: any[]=[
    {value: 'In', text: 'In'},
    {value: 'Out', text: 'Out'},
  ];
  parkingCharge: number=0;

  constructor(
    private formBuilder: FormBuilder,
    private storage: LocalStorageService
  ) {
    this.vehicleForm = this.createForm();
  }

  ngOnInit(): void {
    this.getVehicleTypes();

  }

  ngOnChanges(changes: SimpleChanges){
    if(changes[`id`].previousValue != changes[`id`].currentValue){
      if(changes[`id`].currentValue>0){
      this.storage.getVehicleById(this.id).subscribe({
        next: (res)=>{
              this.vehicleForm.patchValue({
                id: res.id,
                typeId: res.typeId,
                ownerName: res.ownerName,
                phone: res.phone,
                status: res.status,
                address: res.address,
                entryTime: res.entryTime,
                exitTime: res.exitTime,
                licenseNumber: res.licenseNumber
              });
              this.changeParkingType(res.typeId);
        }
      });
    } else {
      this.vehicleForm = this.createForm();
    }
    }

  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(''),
      typeId: new FormControl('', Validators.required),
      ownerName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      address: new FormControl(''),
      entryTime: new FormControl('', Validators.required),
      exitTime: new FormControl(''),
      licenseNumber: new FormControl('', Validators.required),
      parkingCharge: new FormControl(''),
    })
  }

  getVehicleTypes() {
    this.storage.getVehicleTypes().subscribe({
      next: (res) => {
        this.vehicleTypes= res;
      }
    })
  }

  changeType(event: any){
    const typeId = event?.target?.value ?? 0 as number;
    this.changeParkingType(typeId);
  }

  changeParkingType(id: number) {
    const charge = this.vehicleTypes.filter(x=> x.id == id)[0]?.parkingCharge;
    this.vehicleForm.patchValue({
      parkingCharge: charge
    });
  }

  save(){
    if(this.vehicleForm.valid){
      this.saveVehilce.emit(this.vehicleForm.getRawValue())
    }
  }

}

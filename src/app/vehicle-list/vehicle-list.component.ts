import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { LocalStorageService } from '../services/local-storage.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {

  vehicleList: Vehicle[] = [];
  selectedId: number=0;
  oparation: string = 'Add Vehicle';
  showModal: boolean = false;
  constructor(
    private storage: LocalStorageService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getVehicleList();
  }


  open(content: any,id: number = 0) {
    this.showModal = true;
    (id > 0) ? this.edit(id): this.add();
    this.modalService.open(content).result.then(
    (result) => {
      console.log(result);
      this.showModal = false
    });
  }

  modalClose(){
    this.showModal = false;
    this.modalService.dismissAll();
  }
  getVehicleList(){
    this.storage.getVehicle().subscribe({
      next:(res)=>{
        this.vehicleList = res;
      }
    })
  }

  edit(id: number){
    this.selectedId = id;
    this.oparation='Edit Vehicle';
  }

  add(){
    this.selectedId = 0;
    this.oparation='Add Vehicle';
  }

  save(vehicle: Vehicle) {
    if(vehicle.id> 0) {
      this.storage.updateVehicle(vehicle).subscribe({
        next: (res)=>{
            console.log(res);
        }
      });
    } else {
      this.storage.addVehicle(vehicle).subscribe({
        next: (res)=>{
            console.log(res);
        }
      });
    }
    this.modalClose();
  }

}

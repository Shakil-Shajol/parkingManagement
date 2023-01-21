import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehicleAddComponent } from './vehicle-add/vehicle-add.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

const routes: Routes = [
  {path:'', component: DashboardComponent},
  {path: 'vehicle', component: VehicleListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

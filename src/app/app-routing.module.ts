import {Component, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateComponent} from "./create/create.component";
import {LoginComponent} from "./login/login.component";
import {VehicleComponent} from "./vehicle/vehicle.component";
import {RegisterComponent} from "./register/register.component";



const routes: Routes = [
  {path: 'add', component: CreateComponent},
  {path: 'vehicles', component: VehicleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vehicle} from "../vehicle";
import {Router} from "@angular/router";
import {Signalr} from "../signalr";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  private  http: HttpClient;
  private router: Router;
  private token: string;

  constructor(http: HttpClient, router: Router) {
    this.http = http;
    this.router = router;
    this.token = sessionStorage.getItem('token');
    if (this.token == null || this.token.toString().length < 3) { //no token or too short
      this.router.navigate(['/login']); //rootunng login
    }
  }

  upload(name: HTMLInputElement, line: HTMLInputElement, floor: HTMLInputElement, night: HTMLInputElement) {
    const newVehicle = new Vehicle();
    newVehicle.VehicleName = name.value;
    newVehicle.VehicleNumber = parseInt(line.value, 10);
    newVehicle.IsLowFloor = floor.checked;
    newVehicle.IsNight = night.checked;

      //token is ok
      //we want to get token from server
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      };

      //post send. No need to be generic.
      this.http.post('https://publictransportapi.azurewebsites.net/api/vehicle', newVehicle, {headers}).subscribe(resp => {

      }, error => {
        console.log(error);
      });
  }
  ngOnInit(): void {
  }

}

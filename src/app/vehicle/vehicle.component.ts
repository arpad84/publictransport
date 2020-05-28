import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Vehicle} from "../vehicle";
import {Signalr} from "../signalr";


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  private router: Router;
  private http: HttpClient;
  private token: string; //gain token
  public Vehicles: Array<Vehicle>;
  private sr: Signalr;

  constructor(router: Router, http: HttpClient) {
    this.router = router;
    this.http = http;
    this.token = sessionStorage.getItem('token');
    console.log(this.token);
    if (this.token == null || this.token.toString().length < 3) { //no token or too short
      this.router.navigate(['/login']); //rootunng login
    } else {
      this.GetData()
    }
  }

  GetData(){
    //token is ok
    //we want to get token from server
    const headers = {
      'Content-Type': 'application/json', //jason needs
      Authorization: 'Bearer ' + this.token //give token
    };
    //load activitys with the help of HttpClient                              token added
    this.http.get<Vehicle[]>('https://publictransportapi.azurewebsites.net/api/vehicle', {headers}).subscribe(response => {
      this.Vehicles = response;
      console.log(this.Vehicles);
    }, error => {
      if (error.status.toString() === '401') {
        this.router.navigate(['/login']);
      }
    });

    //endpoint needs
    this.sr = new Signalr('https://publictransportapi.azurewebsites.net/vehicleHub');
    this.sr.register('NewVehicle', t => { //register a method. Give to newActivity
      this.Vehicles.push(t);
      return true; //because it is predicate.
    });

    this.sr.start();
  }

  delete(idn: string) {
    const id = idn;
    console.log('Ez lett a delete:'+ id);


    //token is ok
    //we want to get token from server
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token
    };

    //post send. No need to be generic.
    this.http.delete('https://publictransportapi.azurewebsites.net/api/vehicle/'+id,  {headers}).subscribe(resp => {

    }, error => {
      console.log(error);
    });
    this.router.navigate(['/vehicles']); //rootunng login

   this.GetData()

  }

  listOf(name: string) {
    const elements = name;
    console.log("----------------");
    console.log(name);

    //token is ok
    //we want to get token from server
    const headers = {
      'Content-Type': 'application/json', //jason needs
      Authorization: 'Bearer ' + this.token //give token
    };
    //load activitys with the help of HttpClient                              token added
    this.http.get<Vehicle[]>('https://publictransportapi.azurewebsites.net/api/vehicle/'+elements, {headers}).subscribe(response => {
      this.Vehicles = response;
      console.log("LISTA")
      console.log(this.Vehicles);
    }, error => {
      if (error.status.toString() === '401') {
        this.router.navigate(['/login']);
      }
    });
  }


    ngOnInit(): void {

    }
}

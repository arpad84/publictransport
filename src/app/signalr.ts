import * as signalR from '@aspnet/signalr';
import {Predicate} from '@angular/core';
import {Vehicle} from "./vehicle";


export class Signalr {
  private hubConnection: signalR.HubConnection; //similar like WPF

  constructor(uri: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(uri)
      .build();
  }

  //wait an outter method name        //methods get ticket, gives bool
  register(methodname: string, method: Predicate<Vehicle>) {
    this.hubConnection.on(methodname, method);
  }

  //play this service
  start() {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

}

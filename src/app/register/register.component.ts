import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private http: HttpClient;
  private router: Router;
  constructor(http: HttpClient, router: Router) {
    this.http = http; //posts user
    this.router = router;
  }

  register(mail: HTMLInputElement, pass: HTMLInputElement) {
    const actualuser = new User();
    actualuser.email = mail.value;
    actualuser.password = pass.value;


    //Post-> answer
    //Send post. Warning!!!!!!!!! Our webApi port address needs here!      answer (thats why generic
    this.http.post<User>('https://publictransportapi.azurewebsites.net/api/auth/register', actualuser).subscribe(response => {
      //error method if register failed or mistyped
    }, error => { //if token expores or have aserver problem
      if (error.status.toString() === '401') {
        window.alert('Invalid username or pass');
      } else {
        window.alert('Server is down');
      }
    });
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}

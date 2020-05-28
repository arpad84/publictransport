import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../login-response";
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private http: HttpClient;
  private router: Router;
  constructor(http: HttpClient, router: Router) {
    this.http = http; //posts user
    this.router = router;
    sessionStorage.clear(); //only in this app. It needs to log out
  }

  login(name: HTMLInputElement, pass: HTMLInputElement) {
    const actualuser = new User();
    actualuser.username = name.value;
    actualuser.password = pass.value;


    //Post-> answer
    //Send post. Warning!!!!!!!!! Our webApi port address needs here!      answer (thats why generic
    this.http.post<LoginResponse>('https://publictransportapi.azurewebsites.net/api/auth/login', actualuser).subscribe(response => {
      const token = response.token; //gain token
      if (token != null && token.toString().length > 3) {
        sessionStorage.setItem('token', token);
        this.router.navigate(['/vehicles']);
      } //error method if login failed or mistyped
    }, error => { //if token expores or have aserver problem
      if (error.status.toString() === '401') {
        window.alert('Invalid username or pass');
      } else {
        window.alert('Server is down');
      }
    });
  }

  reg(){
    this.router.navigate(['/register']);
  }

  ngOnInit(): void {
  }

}

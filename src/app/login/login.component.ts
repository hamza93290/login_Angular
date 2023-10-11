import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  indentifiant!: Login
  email = ''
  password = ''

  constructor( private router : Router , private loginServ : LoginService  ){}

  onLog(){

    
    console.log(this.email + "  " + this.password);
    this.loginServ.postLogin(this.email,this.password).subscribe()
  }

}

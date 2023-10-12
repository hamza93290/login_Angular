import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { LoginService } from '../services/login.service';
import { catchError, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.loginRegister(this.loginForm.value)
      .pipe(
          catchError((error: HttpErrorResponse) => {
            console.log(error.message);
            return throwError(() => error);
          })
        )
        .subscribe((response: any) => {
          console.log(response);
          this.getDecodedAccessToken(response)
          if (!response.error) {
            this.router.navigate(['/acceuil']);
          }
        });
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      const tokenInfo: any = jwt_decode(token)
      const expireDate: any = tokenInfo.exp; // get token expiration dateTime
      console.log("tokenInfo = %o and expireDate = %o", tokenInfo, expireDate)
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}


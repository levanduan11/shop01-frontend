import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { AccountService } from '../core/auth/account.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Account } from '../core/auth/account.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    rememberMe: [false],
  });
  private url = environment.API_LOCAL + 'login';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  onLogin(): void {
    this.loginService
      .login({
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
        rememberMe: this.loginForm.get('rememberMe')?.value,
      })
      .subscribe({
        next: (data: Account | null) => {
          if (data) {
            if (!this.router.getCurrentNavigation()) {
              this.router.navigate(['']).then(() => window.location.reload());
            }
          } else {
            this.openSnackBar('please check username or password !!!');
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 400 && err.error.type === 'PASSWORD_INVALID') {
            this.openSnackBar('password invalid');
          } else {
            this.openSnackBar('login fail please try again !!!');
          }
        },
      });
  }
  onLogin1(): void {
    this.loginService
      .login1({
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
        rememberMe: this.loginForm.get('rememberMe')?.value,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['']).then(() => window.location.reload());
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);

          if (err.status === 400 && err.error.type === 'PASSWORD_INVALID') {
            this.openSnackBar('password invalid');
          } else {
            this.openSnackBar('login fail please try again !!!');
          }
        },
      });
  }

  errorHandle(control: string, error: string) {
    return this.loginForm.controls[control].hasError(error);
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000,
    });
  }
  onPre() {
    window.history.back();
  }
}

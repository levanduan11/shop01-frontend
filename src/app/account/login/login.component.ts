import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { TokenService } from '../../core/auth/token.service';
import { FormBuilder, Validators } from '@angular/forms';
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
  formLogin = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  isLogined = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private active: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // const ok = this.active.snapshot.queryParams['logout'];
    // if (ok) {
    //   this.openSnackBar('logout successfully !!!');

    // }
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000,
    });
  }

  errorHandling(control: string, error: string) {
    return this.formLogin.controls[control].hasError(error);
  }

  onSubmit(): void {
    const valueForm = this.formLogin.value;
    if (valueForm) {
      const login = valueForm;
      this.authService.login(login).subscribe({
        next: (data: any) => {
          console.log(data);

          // if (data.Login_error) {
          //   this.openSnackBar(
          //     'Failed to sign in! Please check your credentials and try again.'
          //   );
          // } else {
          //   this.isLogined = true;
          //   this.tokenService.setRefreshKey(data.refreshToken);
          //   this.tokenService.setUsername(data.username);
          //   this.tokenService.setTokeKey(data.accessToken);
          //   this.openSnackBar(
          //     'login successfully'
          //   );
          //   this.router
          //     .navigate(['/home'])
          //     .then(() => window.location.reload());
          // }
        },
        error: (error) => {
          this.openSnackBar('server has error please try again !!!');
        },
      });
    }
  }
}

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  ValidatorFn,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { RegisterService } from './register.service';
import { SnackBarService } from '../../../shared/alert/snack-bar.service';
import { Router } from '@angular/router';

export const passwordMatchValidator: ValidatorFn = (
  fg: AbstractControl
): ValidationErrors | null => {
  return fg.get('password') === fg.get('confirmPassword')
    ? null
    : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  notMatch = false;
  success = false;

  formRegister = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'
        ),
      ],
    ],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: [
      '',
      [Validators.required, passwordMatchValidator, Validators.minLength(6)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private snack: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const username = this.formRegister.get('username')?.value;
    const firstName = this.formRegister.get('firstName')?.value;
    const email = this.formRegister.get('email')?.value;
    const lastName = this.formRegister.get('lastName')?.value;
    const password = this.formRegister.get('password')?.value;

    this.registerService
      .register({
        username,
        firstName,
        email,
        lastName,
        password,
      })
      .subscribe({
        next: () => {
          this.success = true;
          this.snack.openSnackBar('register successfully !');
        },
        error: (err: HttpErrorResponse) => {
          this.errorResponse(err);
        },
      });
  }
  errorResponse(err: HttpErrorResponse): void {
    let mess = '';
    if (
      err.status === 400 &&
      (err.error.type === 'USERNAME_USED' || err.error.type === 'EMAIL_USED')
    ) {
      mess = err.error.message;
    } else {
      mess = 'register fail try again !';
    }
    this.snack.openSnackBar(mess);
  }

  errorFiled(control: string, err: string): boolean {
    return this.formRegister.controls[control].hasError(err);
  }
  onInput(v: HTMLInputElement): void {
    const errElement = document.getElementById(
      'pass-not-match-err'
    ) as HTMLInputElement;
    const value = v.value;
    const pass = this.formRegister.get('password')?.value;
    if (value !== pass) {
      this.notMatch = true;
      errElement.innerText = 'password not match !';
    } else {
      this.notMatch = false;
      errElement.innerText = '';
    }
  }

  onPre(): void {
    window.history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { PasswordService } from './password.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})
export class PasswordComponent implements OnInit {
  time = new Observable<string>((ob: Observer<string>) => {
    setInterval(() => {
      ob.next(new Date().toString());
    }, 1000);
  });
  passwordForm = this.fb.group({
    currentPassword: [null, [Validators.required]],
    newPassword: [null, [Validators.required, Validators.minLength(6)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
  });
  notMatch = false;
  success = false;
  message = '';
  constructor(
    private fb: FormBuilder,
    private passwordService: PasswordService
  ) {}

  ngOnInit() {}

  onSubmit(): void {
    this.notMatch = false;
    this.success = false;
    this.message = '';
    const currentPassword = this.passwordForm.get('currentPassword')?.value;
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      this.notMatch = true;
      return;
    }
    this.passwordService.save(currentPassword, newPassword).subscribe({
      next: (response) => {
        this.success = true;
        this.message = 'Have been changed password successfully';
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        this.success = false;
        this.message = error.error.message;
        console.log(error);
      },
    });
  }

  errorHandling(control: string, error: string) {
    return this.passwordForm.controls[control].hasError(error);
  }
  onInput(v: HTMLInputElement): void {
    const errElement = document.getElementById(
      'pass-not-match-err'
    ) as HTMLInputElement;
    const value = v.value;
    const pass = this.passwordForm.get('password')?.value;
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

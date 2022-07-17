import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordInitService } from './password-init.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css'],
})
export class InitResetPasswordComponent implements OnInit {
  success = false;
  message?: string;
  passwordInitForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });
  constructor(
    private fb: FormBuilder,
    private passwordInit: PasswordInitService
  ) {}

  ngOnInit() {}
  onSubmit(): void {
    const email = this.passwordInitForm.get('email')?.value;
    this.passwordInit.passwordInit(email).subscribe({
      next: (data) => {
        console.log(data);

        this.success = true;
        this.message = 'please check your email to confirm';
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);

        this.message = error.error.message;
      },
    });
  }

  errorHandling(control: string, error: string) {
    return this.passwordInitForm.controls[control].hasError(error);
  }

  onPre(): void {
    window.history.back();
  }
}

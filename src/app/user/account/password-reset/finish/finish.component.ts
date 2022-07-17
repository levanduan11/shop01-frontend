import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordResetFinishService } from './password-reset-finish.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css'],
})
export class FinishResetPasswordComponent implements OnInit {
  passwordForm = this.fb.group({
    newPassword: [null, [Validators.required, Validators.minLength(6)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
  });
  private key!: string;
  notMatch = false;
  success = false;
  message = '';
  constructor(
    private fb: FormBuilder,
    private finishPass: PasswordResetFinishService,
    private router:ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.queryParamMap.subscribe({
      next: (data) => {
        this.key = data.get('key') as string;
      }
    })
  }
  onSubmit(): void {
    this.notMatch = false;
    this.success = false;
    this.message = '';
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      this.notMatch = true;
      return;
    }
    this.finishPass.finishPasswordReset(this.key, newPassword)
      .subscribe({
        next: () => {
          this.success = true;
          this.message = 'reset password successfully';
        },
        error: () => {
          this.message = 'cannot reset password';
        }
    })
  }

  errorHandling(control: string, error: string) {
    return this.passwordForm.controls[control].hasError(error);
  }
  onPre(): void {
    window.history.back();
  }
}

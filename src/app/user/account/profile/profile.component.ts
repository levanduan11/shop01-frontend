import { Account } from './../../../core/auth/account.model';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { AccountService } from '../../../core/auth/account.service';
import { IProfile } from './profile.model';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from '../../../shared/alert/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  account: Account | null = null;
  imageUrl: string | null = null;
  profileForm = this.fb.group({
    id: [],
    username: [
      null,
      [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'
        ),
      ],
    ],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required,Validators.email]],
    imageUrl: [],
  });
  constructor(
    private profileService: ProfileService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private snack: SnackBarService
  ) {}

  ngOnInit() {
    this.accountService.fetch().subscribe({
      next: (data) => {
        if (data) {
          this.account = data;
          this.imageUrl = this.account.imageUrl;
          this.updateForm(this.account);
        }
      },
    });
  }
  onSubmit(): void {
    console.log(this.profileForm.value);
    const profile = this.createFromForm();
    if (this.imageUrl) {
      profile.imageUrl = this.imageUrl;
    }

    this.profileService.updateProfile(profile).subscribe({
      next: () => {
        this.snack.openSnackBar('updated successfully !');
        window.location.reload();
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      },
    });
  }
  onGiveUrl(url: string) {
    this.imageUrl = url;
  }
  private handleError(error: HttpErrorResponse) {
    let mess = '';
    if (
      error.status === 400 &&
      (error.error.type === 'USERNAME_USED' ||
        error.error.type === 'EMAIL_USED')
    ) {
      mess = error.error.message;
    } else {
      mess = 'update fail try again !';
    }
    this.snack.openSnackBar(mess);
  }
  private createFromForm(): IProfile {
    return {
      id: this.profileForm.get('id')?.value,
      username: this.profileForm.get('username')?.value,
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      email: this.profileForm.get('email')?.value,
    };
  }
  errorFiled(control: string, error: string): boolean {
    return this.profileForm.controls[control].hasError(error);
  }
  onPre(): void {
    window.history.back();
  }
  private updateForm(account: Account) {
    this.profileForm.patchValue({
      id: account.id,
      username: account.username,
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
    });
  }
}

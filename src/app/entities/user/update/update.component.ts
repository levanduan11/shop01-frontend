import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../service/service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { HttpErrorResponse } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'user-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  authorities: string[] = [];
  user: User = new User();
  isSaving = false;
  isUpdate = false;
  action = 'Create User';
  error_message = '';
  create_success = '';
  update_success = '';

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  editForm = this.fb.group({
    id: [],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(
          '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'
        ),
      ],
    ],
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(99)],
    ],
    activated: [false],
    authorities: [],
  });
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ user }) => {
      if (user) {
        this.user = user;
        this.action = `Update User: ${user.username}`;
        this.isUpdate = true;
        this.updateForm(this.user);
        this.editForm.controls['password'].clearValidators();
      }
    });
    this.userService
      .getAuthorities()
      .subscribe((roles) => (this.authorities = roles));
  }
  openSnackBar() {
    let mess = '';
    if (this.create_success) {
      mess = this.create_success;
    } else if (this.update_success) {
      mess = this.update_success;
    } else if (this.error_message) {
      mess = this.error_message;
    }

    this._snackBar.open(mess, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1 * 1000,
    });
  }
  onSubmit(): void {
    this.create_success = '';
    this.update_success = '';
    this.error_message = '';
    this.isSaving = true;
    const btnToast = document.getElementById('btn-toast') as HTMLButtonElement;
    this.updateUser(this.user);
    if (this.user.id) {
      this.userService.updateUser(this.user).subscribe({
        next: () => {
          this.update_success = 'updated successfully';
          btnToast.click();
          this.onSaveSuccess();
        },
        error: (error: Error) => {
          this.handleError(error);
          btnToast.click();
        },
      });
    } else {
      this.userService.createUser(this.user).subscribe({
        next: () => {
          this.create_success = 'created successfully';
          btnToast.click();
          this.onSaveSuccess();
        },
        error: (error: Error) => {
          this.handleError(error);
        },
      });
    }
  }

  private handleError(error: Error) {
    if (error.message == 'USERNAME_EXISTING') {
      this.error_message = `existing username: "${this.user.username}" please try again another username`;
    } else if (error.message == 'EMAIL_EXISTING') {
      this.error_message = `existing email: "${this.user.email}" please try again another email`;
    } else {
      this.error_message = error.message;
    }
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }
  private onSaveError(): void {
    this.isSaving = false;
  }
  previousState(): void {
    window.history.back();
  }
  private updateForm(user: User): void {
    this.editForm.patchValue({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      activated: user.activated,
      authorities: user.authorities,
    });
  }

  private updateUser(user: User): void {
    user.username = this.editForm.value['username'];
    user.firstName = this.editForm.value['firstName'];
    user.lastName = this.editForm.value['lastName'];
    user.email = this.editForm.value['email'];
    user.password = this.editForm.value['password'];
    user.activated = this.editForm.value['activated'];
    user.authorities = this.editForm.value['authorities'];
  }
  errorHandling(control: string, error: string) {
    return this.editForm.controls[control].hasError(error);
  }
}

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Registration } from './register.model';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  roles: string[] = ['admin', 'user'];
  users: Registration[] = [];
  successMessage = '';
  notMatch = false;
  messageError = '';
  error = false;

  formRegis = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(
          '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'
        ),
      ],
    ],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
  });

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.notMatch = false;
    this.messageError = '';
    this.error = false;
    this.successMessage = '';
    const password = this.formRegis.get('password')!.value;
    const confirmPassword = this.formRegis.get('confirmPassword')!.value;
    if (password != confirmPassword) {
      this.notMatch = true;
    } else {
      const firstName = this.formRegis.get('firstName')?.value;
      const lastName = this.formRegis.get('lastName')?.value;
      const email = this.formRegis.get('email')?.value;
      const username = this.formRegis.get('username')?.value;
      this.registerService
        .register({
          username,
          firstName,
          lastName,
          email,
          password,
        })
        .subscribe((response) => {
          if (response.username) {
            this.messageError = response.username;
          } else if (response.email) {
            this.messageError = response.email;
          } else {
            this.successMessage = ' register success fully ';
          }
        });
    }
  }

  getParent(ele: HTMLElement, selector: string): HTMLElement | null {
    while (ele.parentElement) {
      if (ele.parentElement.matches(selector)) {
        return ele.parentElement;
      }
      ele = ele.parentElement;
    }
    return null;
  }

  getErrorElement(
    parenEle: HTMLElement | null,
    errorSelector: string
  ): HTMLElement | null {
    if (parenEle) {
      return parenEle.querySelector(errorSelector);
    }
    return null;
  }

  onBlur(even: Event, inputName: string) {
    const ele = <HTMLElement>even.target;

    const selector = '.form-group';
    const pa = this.getParent(ele, selector);
    const err = this.getErrorElement(pa, '.form-message') as HTMLElement;
    const required: string = this.errorCheck(
      inputName,
      'required',
      'this is field required'
    );
    let errMess: string = '';
    switch (inputName) {
      case 'username':
        const inValid: string = this.errorCheck(
          inputName,
          'pattern',
          'username invalid'
        );
        const minLength: string = this.errorCheck(
          inputName,
          'minlength',
          'length must be greater than 3 character'
        );

        errMess = this.assignError(required, inValid, minLength);
        err.innerText = errMess;

        break;

      case 'email':
        const email: string = this.errorCheck(
          inputName,
          'email',
          'email invalid'
        );

        errMess = this.assignError(required, email);
        err.innerText = errMess;

        break;
      case 'password':
        const lengthValid: string = this.errorCheck(
          inputName,
          'minlength',
          'length must be greater than 5 character'
        );
        errMess = this.assignError(required, lengthValid);
        err.innerText = errMess;

        break;
      default:
        if (required) {
          err.innerText = required;
        } else {
          err.innerText = '';
        }
    }
  }

  assignError(...rules: string[]): string {
    for (let i = 0; i < rules.length; i++) {
      if (rules[i]) {
        return rules[i];
      }
    }
    return '';
  }

  errorCheck(
    fieldName: string,
    typeError: string,
    messageError: string
  ): string {
    const error = this.formRegis.get(fieldName)?.errors?.[typeError] as boolean;
    return error ? messageError : '';
  }
  onPre(): void{
    window.history.back();
  }
}

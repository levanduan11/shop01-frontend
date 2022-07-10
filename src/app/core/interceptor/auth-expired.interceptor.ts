import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../auth/token.service';
import { AccountService } from '../auth/account.service';
import { LoginService } from '../../login/login.service';
import { type } from 'os';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private loginService: LoginService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          const status = err.status;
          const type = err.error.type;
          if (status === 401 && type === 'invalid_token') {
            this.loginService.logout();
            this.router
              .navigate(['/login'])
              .then(() => window.location.reload());
          }
        },
      })
    );
  }
}

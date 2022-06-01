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

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(private router: Router,private token:TokenService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 403 && !err.url?.includes('api/login')) {
            this.token.clearToken();
            this.router.navigate(['/login']).then(()=>window.location.reload());
          }
        },
      })
    );
  }
}

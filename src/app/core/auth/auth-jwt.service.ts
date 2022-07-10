import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/login/login.model';
import { map, Observable, catchError, tap, of } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

export class JwtResponse {
  constructor(
    public accessToken: string,
    public refreshToken: string,
    public username: string
  ) {}
}
@Injectable({
  providedIn: 'root',
})
export class AuthServerProvider {
  constructor(private http: HttpClient) {}
  private resourceUrl = environment.API_LOCAL + 'login';

  getToken(): string {
    const tokenInLocal: string | null = window.localStorage.getItem(
      'authenticationToken'
    );
    const tokenInSession: string | null = window.sessionStorage.getItem(
      'authenticationToken'
    );
    return tokenInLocal ?? tokenInSession ?? '';
  }

  login(login: Login): Observable<void> {
    return this.http
      .post<JwtResponse>(`${this.resourceUrl}`, login)
      .pipe(
        // tap({
        //   next(value) {
        //       console.log(value);

        //   },
        //   error(err) {
        //       console.log(err);

        //   },
        // }),
        map((response) => this.authenticateSuccess(response, login.rememberMe)),
        //catchError((err)=>of(err))
      );
  }
  logout(): Observable<void> {
    return new Observable((observer) => {
      window.sessionStorage.removeItem('authenticationToken');
      window.localStorage.removeItem('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(
    response: JwtResponse,
    rememberMe: boolean
  ): void {
    const jwt = response.accessToken;
    if (rememberMe) {
      window.localStorage.setItem('authenticationToken', jwt);
      window.sessionStorage.removeItem('authenticationToken');
    } else {
      window.sessionStorage.setItem('authenticationToken', jwt);
      window.localStorage.removeItem('authenticationToken');
    }
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { catchError, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Profile } from '../../account/profile/profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url_login = environment.API_LOCAL + 'login';
  private url_account = environment.API_LOCAL + 'account';

  constructor(private http: HttpClient, private tokenService: TokenService) {}
  login(login: Login): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.url_login, login);
  }
  account(): Observable<Profile> {
    const token = 'Bearer ' + this.tokenService.getTokenKey();
    const options = {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };
    return this.http.get<Profile>(this.url_account);
  }

  getBearerToKen(): any{
      const token = 'Bearer ' + this.tokenService.getTokenKey();
      const options = {
        headers: new HttpHeaders({
          Authorization: token,
        }),
      };
    return options;
  }
}

export class JwtResponse {
  constructor(
    public accessToken: string,
    public refreshToken: string,
    public username: string
  ) {}
}

export class Login {
  constructor(
    public username: string | null,
    public password: string | null,
    public rememberMe: boolean
  ) {}
}

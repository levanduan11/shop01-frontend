import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, tap, catchError } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User, IUser } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private resourceUrl = environment.API_LOCAL + 'admin/users';
  private email_used = 'Email is already is used';
  private username_used = 'username already existing';

  constructor(private http: HttpClient, private auth: AuthService) {}

  listAllUsers(): Observable<any> {
    const params = new HttpParams();
    params.set('1', '111');
    params.set('2', '112');
    params.set('3', '113');
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
      params: params,
    };
    return this.http.get(this.resourceUrl + '/all');
  }

  getAll(): Observable<HttpResponse<IUser>>{
    return this.http.get(this.resourceUrl, { observe: 'response' });
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http
      .post(this.resourceUrl, user);

  }
  updateUser(user: IUser): Observable<IUser> {
    return this.http
      .put(this.resourceUrl, user);

  }
  getAuthorities(): Observable<string[]> {
    const url = `${environment.API_LOCAL}roles`;
    return this.http.get<string[]>(url);
  }

  deleteUser(username: string): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${username}`);
  }

  find(username: string|null): Observable<IUser> {
    const url = `${this.resourceUrl}/${username}`;
    return this.http.get<IUser>(url);
  }


}

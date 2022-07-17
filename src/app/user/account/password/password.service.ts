import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private url = environment.API_LOCAL + 'account/change-password';
  constructor(private http: HttpClient) {}

  save(
    currentPassword: string,
    newPassword: string
  ): Observable<HttpResponse<void>> {
    return this.http.post<void>(
      this.url,
      { currentPassword, newPassword },
      {
        observe: 'response',
      }
    );
  }
}

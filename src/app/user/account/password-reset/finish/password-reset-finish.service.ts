import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetFinishService {
  private url = environment.API_LOCAL + 'account/reset-password/finish';

  constructor(private http: HttpClient) {}

  finishPasswordReset(
    key: string,
    newPassword: string
  ): Observable<HttpResponse<void>> {
    return this.http.post<void>(
      `${this.url}`,
      { key, newPassword },
      {
        observe: 'response',
      }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordInitService {
  private url = environment.API_LOCAL + 'account/reset-password/init';

  constructor(private http: HttpClient) {}

  passwordInit(mail: string): Observable<HttpResponse<void>> {
    return this.http.post<void>(`${this.url}`, mail, {
      observe: 'response',
    });
  }
}

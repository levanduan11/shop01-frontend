import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivateService {
  private url = environment.API_LOCAL + 'activate';

  constructor(private http: HttpClient) {}

  get(key: string): Observable<HttpResponse<void>> {
    return this.http.get<void>(`${this.url}`, {
      observe: 'response',
      params:new HttpParams().set('key',key)
    });
  }
}

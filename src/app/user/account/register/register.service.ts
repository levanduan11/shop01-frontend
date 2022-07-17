import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';
import { Registration } from './register.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
 private baseUrl = environment.API_LOCAL + 'register';

  constructor(private http: HttpClient) { }

  register(register: Registration): Observable<any>{

    return this.http.post(this.baseUrl, register);

  }
}

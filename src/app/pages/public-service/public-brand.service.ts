import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBrand } from '../../admin/entities/brand/model/brand.model';

@Injectable({
  providedIn: 'root',
})
export class PublicBrandService {
  private baseUrl = environment.API_LOCAL + 'client';

  constructor(private http: HttpClient) {}

  listForHome(): Observable<HttpResponse<IBrand[]>> {
    return this.http.get<IBrand[]>(`${this.baseUrl}/b/top`, {
      observe: 'response',
    });
  }
}

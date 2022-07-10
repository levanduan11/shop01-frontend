import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { IProduct } from '../../admin/entities/product/model/product.model';
import { Pagination } from '../../util/request/request.model';
import { optionRequest } from '../../util/request/request-util';

@Injectable({
  providedIn: 'root',
})
export class PublicProductService {
  private baseUrl = environment.API_LOCAL + 'client';

  constructor(private http: HttpClient) {}

  viewDetailProduct(alias: string): Observable<HttpResponse<IProduct>> {
    return this.http.get<IProduct>(`${this.baseUrl}/p/${alias}`, {
      observe: 'response',
    });
  }

  search(req: Pagination): Observable<HttpResponse<IProduct[]>> {
    const option = optionRequest(req);
    return this.http.get<IProduct[]>(`${this.baseUrl}/search`, {
      params: option,
      observe: 'response',
    });
  }

  listNew(): Observable<HttpResponse<IProduct[]>> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/p/new`, {
      observe: 'response',
    });
  }

  listByBrand(id: number, req?: Pagination): Observable<HttpResponse<IProduct[]>> {
    const options = optionRequest(req);
    return this.http.get<IProduct[]>(`${this.baseUrl}/b/${id}`, {
      params:options,
      observe: 'response',
    });
  }
}

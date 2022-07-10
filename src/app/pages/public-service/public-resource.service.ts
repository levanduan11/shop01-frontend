import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../admin/entities/product/model/product.model';
import { Pagination } from '../../util/request/request.model';
import { optionRequest } from '../../util/request/request-util';

@Injectable({
  providedIn: 'root',
})
export class PublicResourceService {
  private baseUrl = environment.API_LOCAL + 'client';

  constructor(private http: HttpClient) { }

  listProductByCategory(
    categoryAlias: string,
    req?: Pagination
  ): Observable<HttpResponse<IProduct[]>> {
    const options = optionRequest(req);
    return this.http.get<IProduct[]>(`${this.baseUrl}/c/${categoryAlias}`, {
      params: options,
      observe: 'response',
    });
  }
}

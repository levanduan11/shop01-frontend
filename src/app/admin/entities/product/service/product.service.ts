import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IProductList } from '../model/product-list.model';
import { Observable } from 'rxjs';
import { getProductIdentifier, IProduct } from '../model/product.model';
import { environment } from 'src/environments/environment.prod';

export type EntityListResponseType = HttpResponse<IProductList[]>;
export type EntityResponseType = HttpResponse<IProduct>;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private resourceServer = environment.API_LOCAL + 'admin/products';

  constructor(private http: HttpClient) {}
  create(product: IProduct): Observable<EntityResponseType> {
    return this.http.post<IProduct>(this.resourceServer, product, {
      observe: 'response',
    });
  }
  update(product: IProduct): Observable<EntityResponseType> {
    return this.http.put<IProduct>(
      `${this.resourceServer}/${getProductIdentifier(product) as number}`,
      product,
      {
        observe: 'response',
      }
    );
  }
  partialUpdate(product: IProduct): Observable<EntityResponseType> {
    return this.http.patch<IProduct>(
      `${this.resourceServer}/${getProductIdentifier(product) as number}`,
      product,
      {
        observe: 'response',
      }
    );
  }
  findAll(): Observable<EntityListResponseType> {
    return this.http.get<IProductList[]>(this.resourceServer, {
      observe: 'response',
    });
  }

  findOne(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduct>(`${this.resourceServer}/${id}`, {
      observe: 'response',
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceServer}/${id}`, {
      observe: 'response',
    });
  }
}

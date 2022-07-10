import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { CategoryNode } from '../model/category-node.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { getCategoryIdentifier, ICategory } from '../model/category.model';
import { ICategoryForNew } from '../model/category-parent-create.model';
import { ICategoryClient } from '../model/category-client.model';

export type EntityResponseType = HttpResponse<ICategory>;
export type EntityListResponseType = HttpResponse<ICategory[]>;
export type EntityListForNewResponseType = HttpResponse<ICategoryForNew[]>;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiURL = environment.API_LOCAL + 'admin/categories';
  private byId = environment.API_LOCAL + 'admin/category';
  private urlPublic = environment.API_LOCAL + 'client/categories';

  constructor(private http: HttpClient) {}

  listAll(): Observable<CategoryNode> {
    return this.http.get<CategoryNode>(`${this.apiURL}/all`);
  }
  listAllPublic(): Observable<CategoryNode> {
    return this.http.get<CategoryNode>(`${this.urlPublic}`);
  }
  listForNew(): Observable<EntityListForNewResponseType> {
    return this.http.get<ICategoryForNew[]>(`${this.apiURL}/by-name-create`, {
      observe: 'response',
    });
  }

  createCategory(category: ICategory): Observable<EntityResponseType> {
    return this.http.post<ICategory>(this.apiURL, category, {
      observe: 'response',
    });
  }

  updateCategory(category: ICategory): Observable<EntityResponseType> {
    return this.http.put<ICategory>(
      `${this.apiURL}/${getCategoryIdentifier(category) as number}`,
      category,
      {
        observe: 'response',
      }
    );
  }

  findByAlias(alias: string): Observable<EntityResponseType> {
    return this.http.get<ICategory>(`${this.apiURL}/${alias}`, {
      observe: 'response',
    });
  }

  findById(id: number): Observable<EntityResponseType> {
    return this.http.get<ICategory>(`${this.byId}/${id}`, {
      observe: 'response',
    });
  }

  deleteCategory(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.apiURL}/${id}`, {
      observe: 'response',
    });
  }

  listForClient(): Observable<ICategoryClient[]> {
    return this.http.get<ICategoryClient[]>(this.urlPublic);
  }
}

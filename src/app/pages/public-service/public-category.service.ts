import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { ICategoryClient } from '../../admin/entities/category/model/category-client.model';
import { CategoryNode } from 'src/app/admin/entities/category/model/category-node.model';
import { ICategoryParent } from '../../admin/entities/category/model/category-parent.model';

@Injectable({
  providedIn: 'root',
})
export class PublicCategoryService {
  private baseUrl = environment.API_LOCAL + 'client';

  constructor(private http: HttpClient) {}

  findOneAndSubCategory(alias: string): Observable<HttpResponse<CategoryNode>> {
    return this.http.get<CategoryNode>(`${this.baseUrl}/categories/${alias}`, {
      observe: 'response',
    });
  }
  findAllParent(alias: string): Observable<HttpResponse<ICategoryParent[]>> {
    return this.http.get<ICategoryParent[]>(
      `${this.baseUrl}/categories/p/${alias}`,
      {
        observe: 'response',
      }
    );
  }
}

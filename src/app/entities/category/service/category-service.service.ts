import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { CategoryNode } from '../model/category-node.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiURL = environment.API_LOCAL + 'admin/categories';
  constructor( private http:HttpClient) { }

  listAll(): Observable<CategoryNode>{

    return this.http.get<CategoryNode>(`${this.apiURL}/alll`);
  }
}

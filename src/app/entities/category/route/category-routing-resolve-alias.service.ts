import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Route,
  Router,
} from '@angular/router';
import { Observable, of, mergeMap, EMPTY } from 'rxjs';
import { ICategory, Category } from '../model/category.model';
import { CategoryService } from '../service/category-service.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryRoutingResolveService implements Resolve<ICategory> {
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ICategory | Observable<ICategory> | Promise<ICategory> {
    const alias = route.params['alias'];
    if (alias) {
       return this.categoryService.findByAlias(alias).pipe(
         mergeMap((category:HttpResponse<Category>) => {
            if (category.body) {
              return of(category.body)
            } else {
              this.router.navigate(['home']);
              return EMPTY;
            }
         })
       );
    }
    return of(new Category());
  }
}

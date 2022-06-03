import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of, mergeMap, EMPTY } from 'rxjs';
import { ICategory, Category } from '../model/category.model';
import { CategoryService } from '../service/category-service.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryRoutingResolveIdService implements Resolve<ICategory> {
  constructor(private service: CategoryService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ICategory | Observable<ICategory> | Promise<ICategory> {
    const id = route.params['id'];
    if (id) {
      return this.service.findById(id).pipe(
        mergeMap((category: HttpResponse<Category>) => {
          if (category.body) {
            return of(category.body);
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

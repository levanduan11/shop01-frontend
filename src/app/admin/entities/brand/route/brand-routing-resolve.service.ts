import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of, mergeMap, EMPTY } from 'rxjs';
import { Brand, IBrand } from '../model/brand.model';
import { BrandService } from '../service/brand.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BrandRoutingResolveService implements Resolve<IBrand> {
  constructor(private service: BrandService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IBrand | Observable<IBrand> | Promise<IBrand> {
    const id = route.params['id'];
    if (id) {
      return this.service.finById(id).pipe(
        mergeMap((brand: HttpResponse<Brand>) => {
          if (brand.body) {
            return of(brand.body);
          } else {
            this.router.navigate(['']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Brand());
  }
}

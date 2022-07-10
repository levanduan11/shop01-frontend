import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, mergeMap, EMPTY, of } from 'rxjs';
import {
  IProduct,
  Product,
} from '../../admin/entities/product/model/product.model';
import { PublicProductService } from '../public-service/public-product.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailRoutingResolveService implements Resolve<IProduct> {
  constructor(
    private productServicePublic: PublicProductService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IProduct | Observable<IProduct> | Promise<IProduct> {
    const alias = route.params['alias'];
    if (alias) {
      return this.productServicePublic.viewDetailProduct(alias).pipe(
        mergeMap((product: HttpResponse<IProduct>) => {
          if (product.body) {
            return of(product.body);
          }
          this.router.navigate(['']);
          return EMPTY;
        })
      );
    }
    return new Product();
  }
}

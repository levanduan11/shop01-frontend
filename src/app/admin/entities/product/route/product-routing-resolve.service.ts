import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, mergeMap, EMPTY } from 'rxjs';
import { IProduct, Product } from '../model/product.model';
import { ProductService } from '../service/product.service';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductRoutingResolveService implements Resolve<IProduct>{

  constructor(private router: Router, private service: ProductService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProduct | Observable<IProduct> | Promise<IProduct> {
    const id = route.params['id'];
    if (id) {
      return this.service.findOne(id)
        .pipe(
          mergeMap((product: HttpResponse<IProduct>) => {
            if (product.body) {
              return of(product.body)
            } else {
              this.router.navigate(['/home']);
              return EMPTY;
            }
          })
        )
    }
    return of(new Product());
  }

}

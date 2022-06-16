import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductUpdateComponent } from '../update/update.component';
import { ProductDetailComponent } from '../detail/detail.component';
import { ProductDeleteComponent } from '../delete/delete.component';
import { NgModule } from '@angular/core';
import { CanActivationService } from 'src/app/core/auth/can-activation.service';
import { ProductRoutingResolveService } from './product-routing-resolve.service';

const productRouter: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: { title: 'product-list' },
    canActivate: [CanActivationService],
  },
  {
    path: 'new',
    component: ProductUpdateComponent,
    data: { title: 'product-new' },
    canActivate: [CanActivationService],
  },
  {
    path: ':id/edit',
    component: ProductUpdateComponent,
    data: { title: 'product-edit' },
    canActivate: [CanActivationService],
    resolve: {
      product: ProductRoutingResolveService,
    },
  },
  {
    path: ':id/view',
    component: ProductDetailComponent,
    data: { title: 'product-view' },
    canActivate: [CanActivationService],
    resolve: {
      product: ProductRoutingResolveService,
    },
  },
  {
    path: ':id/delete',
    component: ProductDeleteComponent,
    data: { title: 'product-delete' },
    canActivate: [CanActivationService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(productRouter)],
  exports: [RouterModule]
})
export class ProductRoutingModule {

}

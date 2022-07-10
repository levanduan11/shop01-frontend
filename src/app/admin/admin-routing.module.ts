
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeManagerComponent } from './manager/home-manager/home-manager.component';


@NgModule({
  declarations: [HomeManagerComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeManagerComponent,
      },
      {
        path: 'user',
        data: { title: 'user' },
        loadChildren: () =>
          import('./entities/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'customer',
        data: { title: 'customer' },
        loadChildren: () =>
          import('./entities/customer/customer.module').then(
            (m) => m.CustomerModule
          ),
      },
      {
        path: 'brand',
        data: { title: 'brand' },
        loadChildren: () =>
          import('./entities/brand/brand.module').then((m) => m.BrandModule),
      },
      {
        path: 'category',
        data: { title: 'category' },
        loadChildren: () =>
          import('./entities/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'product',
        data: { title: 'product' },
        loadChildren: () =>
          import('./entities/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
    ]),

  ],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

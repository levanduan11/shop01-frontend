import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user',
        data: { title: 'user' },
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'customer',
        data: { title: 'customer' },
        loadChildren: () =>
          import('./customer/customer.module').then((m) => m.CustomerModule),
      },
      {
        path: 'brand',
        data: { title: 'brand' },
        loadChildren: () =>
          import('./brand/brand.module').then((m) => m.BrandModule),
      },
      {
        path: 'category',
        data: { title: 'category' },
        loadChildren: () =>
          import('./category/category.module').then((m) => m.CategoryModule),
      },
      {
        path: 'product',
        data: { title: 'product' },
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
      },
    ]),
    
  ],
})
export class EntityRoutingModule {}

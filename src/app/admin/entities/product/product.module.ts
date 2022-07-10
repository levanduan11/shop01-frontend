import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductUpdateComponent } from './update/update.component';
import { ProductDetailComponent } from './detail/detail.component';
import { ProductDeleteComponent } from './delete/delete.component';
import { ProductRoutingModule } from './route/product-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [ProductRoutingModule, SharedModule],
  declarations: [
    ProductListComponent,
    ProductUpdateComponent,
    ProductDetailComponent,
    ProductDeleteComponent,
  ],
})
export class ProductModule {}

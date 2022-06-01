import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandRoutingModule } from './route/brand-routing.module';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandUpdateComponent } from './update/update.component';
import { BrandDeleteComponent } from './delete/delete.component';
import { BrandDetailComponent } from './detail/detail.component';

@NgModule({
  imports: [ BrandRoutingModule],
  declarations: [
    BrandListComponent,
    BrandUpdateComponent,
    BrandDeleteComponent,
    BrandDetailComponent,
  ],
})
export class BrandModule {}

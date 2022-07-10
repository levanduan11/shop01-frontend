import { NgModule } from '@angular/core';
import { BrandRoutingModule } from './route/brand-routing.module';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandUpdateComponent } from './update/update.component';
import { BrandDeleteComponent } from './delete/delete.component';
import { BrandDetailComponent } from './detail/detail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [BrandRoutingModule, SharedModule],
  declarations: [
    BrandListComponent,
    BrandUpdateComponent,
    BrandDeleteComponent,
    BrandDetailComponent,
  ],
})
export class BrandModule {}

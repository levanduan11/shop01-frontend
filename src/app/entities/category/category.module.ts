import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryUpdateComponent } from './update/update.component';
import { CategoryDetailComponent } from './detail/detail.component';
import { CategoryDeleteComponent } from './delete/delete.component';
import { CategoryRoutingModule } from './route/category-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [CategoryRoutingModule, SharedModule],
  declarations: [
    CategoryListComponent,
    CategoryUpdateComponent,
    CategoryDetailComponent,
    CategoryDeleteComponent,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoryModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryUpdateComponent } from '../update/update.component';
import { CategoryDetailComponent } from '../detail/detail.component';
import { CanActivationService } from 'src/app/core/auth/can-activation.service';
import { CategoryRoutingResolveService } from './category-routing-resolve-alias.service';
import { CategoryRoutingResolveIdService } from './category-routing-resolve-id.service';

const categoryRoutes: Routes = [
  {
    path: '',
    component: CategoryListComponent,
    data: { title: 'category-list' },
   
  },
  {
    path: 'new',
    component: CategoryUpdateComponent,
    data: { title: 'category-new' },
   
  },
  {
    path: ':id/edit',
    component: CategoryUpdateComponent,
    data: { title: 'category-edit' },
   
    resolve: {
      category:CategoryRoutingResolveIdService
    }
  },
  {
    path: ':alias/view',
    component: CategoryDetailComponent,
    data: { title: 'category-view' },
   
    resolve: {
      category:CategoryRoutingResolveService
    }
  },
  {
    path: ':id/delete',
    component: CategoryDetailComponent,
    data: { title: 'category-delete' },
   
  },
];

@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports:[RouterModule],
})
export class CategoryRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrandListComponent } from '../brand-list/brand-list.component';
import { BrandUpdateComponent } from '../update/update.component';
import { BrandDetailComponent } from '../detail/detail.component';
import { CanActivationService } from 'src/app/core/auth/can-activation.service';
import { BrandRoutingResolveService } from './brand-routing-resolve.service';

const brandRoute: Routes = [
  {
    path: '',
    component: BrandListComponent,
    data: { title: 'brand list' },
    
  },
  {
    path: 'new',
    component: BrandUpdateComponent,
    data: { title: 'brand new' },
    
  },
  {
    path: ':id/edit',
    component: BrandUpdateComponent,
    data: { title: 'brand edit' },
    
    resolve: {
      brand: BrandRoutingResolveService,
    },
  },
  {
    path: ':id/view',
    component: BrandDetailComponent,
    data: { title: 'brand view' },
    
    resolve: {
      brand: BrandRoutingResolveService,
    },
  },
  {
    path: ':id/delete',
    component: BrandDetailComponent,
    data: { title: 'brand delete' },
    
  },
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(brandRoute)],
  exports:[RouterModule],
})
export class BrandRoutingModule {}

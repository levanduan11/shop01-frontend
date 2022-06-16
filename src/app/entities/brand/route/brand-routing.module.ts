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
    canActivate: [CanActivationService],
  },
  {
    path: 'new',
    component: BrandUpdateComponent,
    data: { title: 'brand new' },
    canActivate: [CanActivationService],
  },
  {
    path: ':id/edit',
    component: BrandUpdateComponent,
    data: { title: 'brand edit' },
    canActivate: [CanActivationService],
    resolve: {
      brand: BrandRoutingResolveService,
    },
  },
  {
    path: ':id/view',
    component: BrandDetailComponent,
    data: { title: 'brand view' },
    canActivate: [CanActivationService],
    resolve: {
      brand: BrandRoutingResolveService,
    },
  },
  {
    path: ':id/delete',
    component: BrandDetailComponent,
    data: { title: 'brand delete' },
    canActivate: [CanActivationService],
  },
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(brandRoute)],
  exports:[RouterModule],
})
export class BrandRoutingModule {}

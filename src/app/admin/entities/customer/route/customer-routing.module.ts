import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { CustomerUpdateComponent } from '../update/update.component';
import { CustomerDetailComponent } from '../detail/detail.component';
import { CustomerDeleteComponent } from '../delete/delete.component';
import { CanActivationService } from 'src/app/core/auth/can-activation.service';

const customerRouters: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    data: { title: 'customer-list' },
    
  },
  {
    path: 'new',
    component: CustomerUpdateComponent,
    data: { title: 'customer-new' },
    
  },
  {
    path: ':id/edit',
    component: CustomerUpdateComponent,
    data: { title: 'customer-edit' },
    
  },
  {
    path: ':id/view',
    component: CustomerDetailComponent,
    data: { title: 'customer-detail' },
    
  },
  {
    path: ':id/delete',
    component: CustomerDeleteComponent,
    data: { title: 'customer-delete' },
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(customerRouters)],
  exports:[RouterModule],
})
export class CustomerRoutingModule {}

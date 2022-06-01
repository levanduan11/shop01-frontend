import { NgModule } from '@angular/core';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerUpdateComponent } from './update/update.component';
import { CustomerDetailComponent } from './detail/detail.component';
import { CustomerDeleteComponent } from './delete/delete.component';
import { CustomerRoutingModule } from './route/customer-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CustomerRoutingModule],
  declarations: [
    CustomerListComponent,
    CustomerUpdateComponent,
    CustomerDetailComponent,
    CustomerDeleteComponent,
  ],
})
export class CustomerModule {}

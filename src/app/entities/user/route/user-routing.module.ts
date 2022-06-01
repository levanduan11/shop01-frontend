import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import { UserUpdateComponent } from '../update/update.component';
import { UserDetailComponent } from '../detail/detail.component';
import { UserDeleteComponent } from '../delete/delete.component';
import { NgModule } from '@angular/core';
import { CanActivationService } from 'src/app/core/auth/can-activation.service';
import { UserManagementResolve } from '../user-resolve.service';

const userRouters: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: { title: 'user-list' },
    canActivate: [CanActivationService],
  },
  {
    path: 'new',
    component: UserUpdateComponent,
    data: { title: 'user-update' },
    canActivate: [CanActivationService],
  },
  {
    path: ':username/edit',
    component: UserUpdateComponent,
    data: { title: 'user-list' },
    canActivate: [CanActivationService],
    resolve: {
      user: UserManagementResolve,
    },
  },
  {
    path: ':username/view',
    component: UserDetailComponent,
    data: { title: 'user-list' },
    canActivate: [CanActivationService],
    resolve: {
      user: UserManagementResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRouters)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

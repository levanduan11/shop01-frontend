import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from '../password/password.component';
import { ProfileComponent } from '../profile/profile.component';

const accountRouting: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'password',
    component: PasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountRouting)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}

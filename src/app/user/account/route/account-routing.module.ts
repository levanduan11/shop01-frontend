import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from '../password/password.component';
import { ProfileComponent } from '../profile/profile.component';
import { RegisterComponent } from '../register/register.component';
import { ActivateComponent } from '../activate/activate.component';
import { InitResetPasswordComponent } from '../password-reset/init/init.component';
import { FinishResetPasswordComponent } from '../password-reset/finish/finish.component';

const accountRouting: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'password',
    component: PasswordComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'activate',
    component: ActivateComponent,
  },
  {
    path: 'reset/init',
    component: InitResetPasswordComponent,
  },
  {
    path: 'reset/finish',
    component: FinishResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountRouting)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}

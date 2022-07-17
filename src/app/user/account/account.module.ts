import { NgModule } from '@angular/core';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountRoutingModule } from './route/account-routing.module';
import { CommonUserModule } from '../common-user/common-user.module';
import { RegisterComponent } from './register/register.component';
import { ActivateComponent } from './activate/activate.component';
import { InitResetPasswordComponent } from './password-reset/init/init.component';
import { FinishResetPasswordComponent } from './password-reset/finish/finish.component';

@NgModule({
  declarations: [
    PasswordComponent,
    ProfileComponent,
    RegisterComponent,
    ActivateComponent,
    InitResetPasswordComponent,
    FinishResetPasswordComponent,
  ],
  imports: [SharedModule, AccountRoutingModule, CommonUserModule],
})
export class AccountModule {}

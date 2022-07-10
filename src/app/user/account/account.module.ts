import { NgModule } from '@angular/core';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountRoutingModule } from './route/account-routing.module';
import { CommonUserModule } from '../common-user/common-user.module';



@NgModule({
  declarations: [PasswordComponent, ProfileComponent],
  imports: [SharedModule, AccountRoutingModule, CommonUserModule],
})
export class AccountModule {}

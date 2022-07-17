import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { accountRoutes } from './account-route.routing';
import { RegisterComponent } from '../user/account/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { UploadImageComponent } from './upload/upload-image/upload-image.component';


@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    UploadImageComponent,
  ],
  imports: [SharedModule, MatIconModule, RouterModule.forChild(accountRoutes)],
})
export class AccountModule {}

import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from '@angular/router';
import { LOGIN_ROUTE } from './login.route';
import { LoginComponent } from "./login.component";

@NgModule({
  imports: [SharedModule, RouterModule.forChild([LOGIN_ROUTE])],
  declarations:[LoginComponent]
})
export class LoginModule {}

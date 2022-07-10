import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'account',
        loadChildren:()=>import('./account/account.module').then(m=>m.AccountModule)
      }
    ])
  ],
  exports:[RouterModule],
})
export class UserRoutingModule{}

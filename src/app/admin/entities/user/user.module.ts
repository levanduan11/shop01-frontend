import { NgModule } from '@angular/core';
import { UserRoutingModule } from './route/user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './update/update.component';
import { UserDetailComponent } from './detail/detail.component';
import { UserDeleteComponent } from './delete/delete.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [SharedModule, UserRoutingModule],
  declarations: [
    UserListComponent,
    UserUpdateComponent,
    UserDetailComponent,
    UserDeleteComponent,
  ],
  exports: [UserListComponent],
})
export class UserModule {}

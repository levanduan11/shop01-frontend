import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IUser, User } from './user.model';
import { UserService } from './service/service.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserManagementResolve implements Resolve<IUser> {
  constructor(private userService: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IUser | Observable<IUser> | Promise<IUser> {
    const id = route.params['username'];
    

    if (id) {
      return this.userService.find(id);
    }
    return of(new User());
  }
}

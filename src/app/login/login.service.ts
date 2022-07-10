import { Injectable } from '@angular/core';
import { AccountService } from '../core/auth/account.service';
import { AuthServerProvider } from '../core/auth/auth-jwt.service';
import { Login } from './login.model';
import { Observable, mergeMap, map } from 'rxjs';
import { Account } from '../core/auth/account.model';
import { UserStateService } from '../layout/user-state/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private accountService: AccountService,
    private auth: AuthServerProvider,
    private userState: UserStateService
  ) {}

  login(login: Login): Observable<Account | null> {
    return this.auth
      .login(login)
      .pipe(mergeMap(() => this.accountService.identity(true)));
  }
  login1(login: Login): Observable<Account | null> {
    return this.auth
      .login(login)
      .pipe(mergeMap(() => this.accountService.getUser()));
  }
  logout(): void {
    this.auth.logout().subscribe({
      complete: () => {
        this.accountService.authenticate(null);
      },
    });
  }
}

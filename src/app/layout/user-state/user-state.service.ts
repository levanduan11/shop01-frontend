import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/auth/account.service';
import { AuthServerProvider } from 'src/app/core/auth/auth-jwt.service';
import { LoginService } from 'src/app/login/login.service';
import { Account } from '../../core/auth/account.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  account: BehaviorSubject<Account | null> =
    new BehaviorSubject<Account | null>(null);
  constructor(
    private accountService: AccountService,
    private authProvider: AuthServerProvider,
    private router: Router,

  ) {
    
  }

  getUser(): Observable<Account | null> {
    return this.account.asObservable();
  }

   getCurrentUser() {
    const token = this.authProvider.getToken();
    if (token) {
      this.accountService.fetch().subscribe({
        next: (customer: Account) => {
          this.account.next(customer);
        },
        error: () => {
          this.router.navigate(['']).then(() => window.location.reload());
        },
      });
    }
  }
}

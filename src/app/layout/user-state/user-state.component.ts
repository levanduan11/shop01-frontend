import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/core/auth/account.model';
import { AccountService } from 'src/app/core/auth/account.service';
import { LoginService } from 'src/app/login/login.service';
import { UserStateService } from './user-state.service';
import { Authority } from '../../admin/cofig/authority.constant';

@Component({
  selector: 'user-state',
  templateUrl: './user-state.component.html',
  styleUrls: ['./user-state.component.css'],
})
export class UserStateComponent implements OnInit {
  account: Account | null = null;
  isLogin = false;
  isAdmin = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.isLogin = false;
    this.isAdmin = false;
    this.accountService.getUser().subscribe({
      next: (user: Account | null) => {
        if (user) {
          this.isLogin = true;
          this.account = user;
        }
      },
    });

    this.accountService.isRoleAdmin().subscribe({
      next: (data) => {
        this.isAdmin = data;
      },
    });
  }

  login(): void {
    this.router.navigate(['login']);
  }
  logout(event: Event): void {
    event.preventDefault();
    this.loginService.logout();
    this.router.navigate(['']).then(() => window.location.reload());
  }
  register(): void {
    this.router.navigate(['user/account/register']);
  }
}

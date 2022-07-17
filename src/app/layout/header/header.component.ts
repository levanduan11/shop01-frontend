import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { Account } from '../../core/auth/account.model';
import { AccountService } from '../../core/auth/account.service';
import { AuthServerProvider } from '../../core/auth/auth-jwt.service';
import { Authority } from 'src/app/admin/cofig/authority.constant';
import { SnackBarService } from '../../shared/alert/snack-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {


  constructor(
    private router: Router,
    public dialog: MatDialog,
    private snack: SnackBarService
  ) {}
  ngOnInit() {

  }

  onSearch(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value) {
      this.router
        .navigate(['search'], { queryParams: { keyword: value } })
        .then(() => window.location.reload());
    } else {
      this.snack.openSnackBar('please enter keyword !');
    }
  }
}

import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { TokenService } from '../../core/auth/token.service';
import { Router } from '@angular/router';
import { UserService } from '../../entities/user/service/service.service';
import { IUser, User } from '../../entities/user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  checkLogin = false;
  username: string | null = '';
  user!: User;
  imageURL = '';
 // @ViewChild('')s

  constructor(
    private token: TokenService,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit() {
    const check = this.token.getTokenKey();
    if (check) {
      this.checkLogin = true;
      this.username = this.token.getUsername();
      this.userService.find(this.username).subscribe({
        next: (user: User) => {
          if (user.imageUrl) {
            this.imageURL = user.imageUrl;
          }
        },
      });
    }
  }
  onLogout(event: Event): void {
    event.preventDefault();
    this.token.clearToken();
    // this.router
    //   .navigateByUrl('/login?logout=logout')
    //   .then(() => window.location.reload());
    this.router
      .navigate(['login'], { queryParams: { logout: 'logout' } })
     .then(() => window.location.reload());
  }
}

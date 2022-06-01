import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: Profile = new Profile();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.account().subscribe(
      (response) => {
        this.profile.firstName = response.firstName;
        this.profile.lastName = response.lastName;
        this.profile.email = response.email;
        this.profile.username = response.username;
      },
      () => alert('error!!!')
    );
  }

  onPre(): void{
    window.history.back();
  }
}

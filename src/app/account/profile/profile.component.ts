import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {


  constructor(private authService: AuthService) {}

  ngOnInit() {
   
  }

  onPre(): void{
    window.history.back();
  }
}

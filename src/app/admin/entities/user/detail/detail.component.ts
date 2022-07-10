import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'user-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ user }) => {
      if (user) {
        this.user = user;
      }
    });
  }
  prev(): void{
    window.history.back();
  }
}

import { Routes, RouterModule, Route } from '@angular/router';
import { ProfileComponent } from './profile.component';

export const profileRouter: Route = {
  path: 'profile',
  component: ProfileComponent,
  data: { title: 'profile' },
};



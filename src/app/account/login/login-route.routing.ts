import {  Route } from '@angular/router';
import { LoginComponent } from './login.component';

export const loginRouter: Route = {
  path: 'login',
  component: LoginComponent,
  data: { title: 'login' },
};

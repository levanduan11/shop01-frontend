import { Route } from '@angular/router';
import { RegisterComponent } from './register.component';

export const registerRouter: Route = {
  path: 'register',
  component: RegisterComponent,
  data: { title: 'register' },
};

import { Routes } from '@angular/router';
import { loginRouter } from './login/login-route.routing';
import { registerRouter } from './register/register-route.routing';

import { profileRouter } from './profile/profile-route.routing';
import { uploadImageRouting } from './upload/upload-image/upload-image.routing';

const account_router = [
  loginRouter,
  registerRouter,
  profileRouter,
  uploadImageRouting,
];

export const accountRoutes: Routes = [
  {
    path: '',
    children: account_router,
  },
];

import { Routes, RouterModule, Route } from '@angular/router';
import { PublicBrandComponent } from './brand.component';

export const brandRoute: Route = {
  path: 'b/:id',
  component: PublicBrandComponent,
};



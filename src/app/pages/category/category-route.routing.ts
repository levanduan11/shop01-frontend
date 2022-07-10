import { Routes, RouterModule, Route } from '@angular/router';
import { PublicCategoryComponent } from './category.component';

export const categoryRoute: Route = {
  path: 'c/:alias',
  component: PublicCategoryComponent,
};



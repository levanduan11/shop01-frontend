import { brandRoute } from './brand/brand-route.routing';
import { Routes } from '@angular/router';
import { categoryRoute } from './category/category-route.routing';
import { homeRoute } from './home/home-route.routing';
import { ProductDetailRoute } from './product-detail/product-detail-route.routing';
import { searchRoute } from './search/search.routing';
import { testRoute } from './test/test.routing';
import { cartDetailRouting } from './cart-detail/cart-detail.routing';

const routes: Routes = [
  categoryRoute,
  homeRoute,
  ProductDetailRoute,
  searchRoute,
  testRoute,
  brandRoute,
  cartDetailRouting
];

export const pageRoutes: Routes = [
  {
    path: '',
    children: routes,
  },
];

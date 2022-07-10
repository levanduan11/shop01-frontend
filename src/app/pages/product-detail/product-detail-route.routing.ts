import { Routes, RouterModule, Route } from '@angular/router';
import { ProductDetailRoutingResolveService } from './product-detail-routing-resolve.service';
import { ProductViewDetailComponent } from './product-detail.component';

export const ProductDetailRoute: Route = {
  path: 'p/:alias',
  component: ProductViewDetailComponent,
  resolve: {
    product: ProductDetailRoutingResolveService,
  },
};


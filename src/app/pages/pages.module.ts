import { NgModule } from '@angular/core';
import { PublicCategoryComponent } from './category/category.component';
import { SharedModule } from '../shared/shared.module';
import { pageRoutes } from './page-route.routing';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductViewDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component';
import { TestComponent } from './test/test.component';
import { PublicBrandComponent } from './brand/brand.component';
import { ListProductPublicComponent } from './list-product-public/list-product-public.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';


@NgModule({
  declarations: [
    PublicCategoryComponent,
    HomeComponent,
    ProductViewDetailComponent,
    SearchComponent,
    TestComponent,
    PublicBrandComponent,
    ListProductPublicComponent,
    CartDetailComponent
  ],
  imports: [SharedModule, RouterModule.forChild(pageRoutes), RouterModule],
})
export class PagesModule {}

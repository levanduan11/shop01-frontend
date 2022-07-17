import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Authority } from './admin/cofig/authority.constant';
import { AdminRouteAccessService } from './core/auth/admin-router-access.service';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';


const routes: Routes = [



  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'admin',
    data: {
      authorities: [Authority.ADMIN],
    },
    canActivate: [AdminRouteAccessService],
    loadChildren: () =>
      import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user-routing.module').then((m) => m.UserRoutingModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

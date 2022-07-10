import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { accessDeniseRouter } from './access-deniss/access-denise.routing';

const error_router: Routes = [accessDeniseRouter];

@NgModule({
  imports: [RouterModule.forChild(error_router)],
})
export class ErrorRoutingModule {}

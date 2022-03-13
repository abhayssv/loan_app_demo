import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import(`./admin/admin-layout.module`).then(m => m.AdminLayoutModule)},
  { path: '**',    component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

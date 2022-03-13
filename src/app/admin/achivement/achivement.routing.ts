import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAchivementComponent } from './components/listachivement.component';   
import { AchivementResolve } from './service/achivement.resolve';

const routes: Routes = [
  { path: "", component:ListAchivementComponent, resolve: {reviewerreports: AchivementResolve}} 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class AchivementRoutingModule {}

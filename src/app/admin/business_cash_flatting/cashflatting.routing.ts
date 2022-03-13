import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCashFlattingComponent } from './components/listcashflatting.component';  
import { ViewCashFlattingComponent } from './components/viewcashflatting.component';  
import { CashFlattingResolve, ViewCashFlattingResolve } from './service/cashflatting.resolve';

const routes: Routes = [
  { path: "", component:ListCashFlattingComponent, resolve: {cashflattings: CashFlattingResolve}}, 
  { path:"view/:loan_id/:user_id", component: ViewCashFlattingComponent, resolve:{ cashflatting: ViewCashFlattingResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class CashFlattingRoutingModule {}

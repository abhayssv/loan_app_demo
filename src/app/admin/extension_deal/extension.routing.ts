import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtensionDealComponent } from './components/extension.component';   
import { ExtensionDealResolve} from './service/extension.resolve';
import { AddExtensionDeal } from './components/addextension.component'; 

const routes: Routes = [
   { path: "", component:ExtensionDealComponent, resolve: {extension: ExtensionDealResolve}}, 
   { path:"add", component:AddExtensionDeal},
   { path:"edit", component:AddExtensionDeal}
  ]
@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class ExtensionDealRoutingModule {}
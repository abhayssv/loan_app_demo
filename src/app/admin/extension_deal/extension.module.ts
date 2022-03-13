import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ExtensionDealComponent } from './components/extension.component';  
import { ExtensionDealService } from './service/extension.service'; 
import { ExtensionDealResolve } from './service/extension.resolve';
import { ExtensionDealRoutingModule } from './extension.routing';
import { AddExtensionDeal } from './components/addextension.component'; 


@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    ExtensionDealRoutingModule
  ],
  providers:[
    ExtensionDealService, 
    ExtensionDealResolve,
  ],
  declarations:[
    ExtensionDealComponent,
    AddExtensionDeal
  ],
})

export class ExtensionDealModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { SettingsComponent } from './components/settings.component';  
import { SettingsService } from './service/settings.service'; 
import { SettingsResolve } from './service/settings.resolve';
import { SettingsRoutingModule } from './settings.routing';

@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    SettingsRoutingModule
  ],
  providers:[
    SettingsService, 
    SettingsResolve,
  ],
  declarations:[
    SettingsComponent,
  ],
})

export class SettingsModule {}

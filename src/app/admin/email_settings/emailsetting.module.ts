import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { EmailSettingComponent } from './components/emailsetting.component';  
import { EmailSettingService } from './service/emailsetting.service'; 
import { EmailSettingResolve } from './service/emailsetting.resolve';
import { EmailSettingRoutingModule } from './emailsetting.routing';

@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    EmailSettingRoutingModule
  ],
  providers:[
    EmailSettingService, 
    EmailSettingResolve,
  ],
  declarations:[
    EmailSettingComponent,
  ],
})

export class EmailSettingModule {}

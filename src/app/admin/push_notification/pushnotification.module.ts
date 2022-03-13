import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PushNotificationComponent } from './components/pushnotification.component';  
import { PushNotificationService } from './service/pushnotification.service'; 
import { PushNotificationRoutingModule } from './pushnotification.routing';

@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    PushNotificationRoutingModule
  ],
  providers:[
    PushNotificationService,
  ],
  declarations:[
    PushNotificationComponent,
  ],
})

export class PushNotificationModule {}

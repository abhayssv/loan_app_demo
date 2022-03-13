import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PushNotificationComponent } from './components/pushnotification.component';   

const routes: Routes = [
  { path: "", component:PushNotificationComponent}, 
]
@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class PushNotificationRoutingModule {}
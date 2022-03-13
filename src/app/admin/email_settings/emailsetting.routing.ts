import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailSettingComponent } from './components/emailsetting.component';   
import { EmailSettingResolve} from './service/emailsetting.resolve';

const routes: Routes = [
  { path: "", component:EmailSettingComponent, resolve: {emailsettings: EmailSettingResolve}}, 
]
@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class EmailSettingRoutingModule {}
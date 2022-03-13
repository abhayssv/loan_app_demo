import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings.component';   
import { SettingsResolve} from './service/settings.resolve';

const routes: Routes = [
  { path: "", component:SettingsComponent, resolve: {settings: SettingsResolve}}, 
]
@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class SettingsRoutingModule {}
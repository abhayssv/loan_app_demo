import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewProfileComponent } from './components/viewprofile.component';
import { EditProfileComponent } from './components/editprofile.component';
import { ProfileService } from './service/profile.service';
import { ProfileResolve } from './service/profile.resolve';

import { ProfileRoutingModule } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule
  ],
  providers: [
    ProfileService,
    ProfileResolve
  ],
  declarations: [
    ViewProfileComponent,
    EditProfileComponent
  ]
})
export class ProfileModule { }
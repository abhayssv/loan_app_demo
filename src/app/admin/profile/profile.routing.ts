import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProfileComponent } from './components/viewprofile.component';
import { EditProfileComponent } from './components/editprofile.component';
import { ProfileResolve } from './service/profile.resolve';

const routes: Routes = [
    { path: "", component: ViewProfileComponent, resolve: { profile: ProfileResolve } },
    { path: "edit", component: EditProfileComponent, resolve: { profile: ProfileResolve } }
];

@NgModule ({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class ProfileRoutingModule {}

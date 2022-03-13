import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './components/listpage.component';
import { EditPageComponent} from './components/editpage.component';
import { AddPageComponent } from './components/addpage.component'; 
import { ViewPageComponent } from './components/viewpage.component';   
import { PageResolve, DetailPageResolve, ViewPageResolve } from './service/page.resolve';

const routes: Routes = [
  { path: "", component:ListPageComponent, resolve: {pages: PageResolve}},
  { path:"edit/:page_id", component: EditPageComponent, resolve:{ page: DetailPageResolve} },
  { path:"add", component:AddPageComponent}, 
  { path:"view/:page_id", component: ViewPageComponent, resolve:{ page: ViewPageResolve} },
  // { path:"contact/:page_id", component: ViewContactComponent, resolve:{ contact: ViewContactResolve} },
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class PageRoutingModule {}

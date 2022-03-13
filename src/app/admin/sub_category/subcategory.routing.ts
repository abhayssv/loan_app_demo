import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSubCategoryComponent } from './components/listsubcategory.component';
import { EditSubCategoryComponent} from './components/editsubcategory.component';
import { AddSubCategoryComponent } from './components/addsubcategory.component'; 
import { ViewSubCategoryComponent } from './components/viewsubcategory.component';   
import { SubCategoryResolve, DetailSubCategoryResolve, ViewSubCategoryResolve } from './service/subcategory.resolve';

const routes: Routes = [
  { path: "", component:ListSubCategoryComponent, resolve: {subcategories: SubCategoryResolve}},
  { path:"edit/:id", component: EditSubCategoryComponent, resolve:{ subcategory: DetailSubCategoryResolve} },
  { path:"add", component:AddSubCategoryComponent}, 
  { path:"view/:id", component: ViewSubCategoryComponent, resolve:{ subcategory: ViewSubCategoryResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class SubCategoryRoutingModule {}

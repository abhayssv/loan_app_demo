import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './components/listcategory.component';
import { EditCategoryComponent} from './components/editcategory.component';
import { AddCategoryComponent } from './components/addcategory.component'; 
import { ViewCategoryComponent } from './components/viewcategory.component';   
import { CategoryResolve, DetailCategoryResolve, ViewCategoryResolve } from './service/category.resolve';

const routes: Routes = [
  { path: "", component:ListCategoryComponent, resolve: {categories: CategoryResolve}},
  { path:"edit/:id", component: EditCategoryComponent, resolve:{ category: DetailCategoryResolve} },
  { path:"add", component:AddCategoryComponent}, 
  { path:"view/:id", component: ViewCategoryComponent, resolve:{ category: ViewCategoryResolve} }, 
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class CategoryRoutingModule {}

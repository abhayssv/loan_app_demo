import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddCategoryComponent } from './components/addcategory.component';
import { ListCategoryComponent } from './components/listcategory.component';
import { EditCategoryComponent } from './components/editcategory.component'; 
import { ViewCategoryComponent } from './components/viewcategory.component'; 
import { CategoryService } from './service/category.service';
import { CategoryResolve , DetailCategoryResolve, ViewCategoryResolve } from './service/category.resolve';
import { CategoryRoutingModule } from './category.routing';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    CategoryRoutingModule, 
    AngularEditorModule,
  ],
  providers:[
    CategoryService, 
    CategoryResolve,
    DetailCategoryResolve,
    ViewCategoryResolve,  
  ],
  declarations:[
    ListCategoryComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    ViewCategoryComponent, 
  ]
})

export class CategoryModule {}

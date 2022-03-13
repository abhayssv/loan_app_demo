import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddSubCategoryComponent } from './components/addsubcategory.component';
import { ListSubCategoryComponent } from './components/listsubcategory.component';
import { EditSubCategoryComponent } from './components/editsubcategory.component'; 
import { ViewSubCategoryComponent } from './components/viewsubcategory.component'; 
import { SubCategoryService } from './service/subcategory.service';
import { SubCategoryResolve , DetailSubCategoryResolve, ViewSubCategoryResolve } from './service/subcategory.resolve';
import { SubCategoryRoutingModule } from './subcategory.routing';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    SubCategoryRoutingModule, 
    AngularEditorModule,
  ],
  providers:[
    SubCategoryService, 
    SubCategoryResolve,
    DetailSubCategoryResolve,
    ViewSubCategoryResolve,  
  ],
  declarations:[
    ListSubCategoryComponent,
    EditSubCategoryComponent,
    AddSubCategoryComponent,
    ViewSubCategoryComponent, 
  ]
})

export class SubCategoryModule {}

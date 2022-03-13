import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddPageComponent } from './components/addpage.component';
import { ListPageComponent } from './components/listpage.component';
import { EditPageComponent } from './components/editpage.component'; 
import { ViewPageComponent } from './components/viewpage.component'; 
import { PageService } from './service/page.service';
import { PageResolve , DetailPageResolve, ViewPageResolve } from './service/page.resolve';
import { PageRoutingModule } from './page.routing';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    PageRoutingModule, 
    AngularEditorModule,
  ],
  providers:[
    PageService, 
    PageResolve,
    DetailPageResolve,
    ViewPageResolve, 

  ],
  declarations:[
    ListPageComponent,
    EditPageComponent,
    AddPageComponent,
    ViewPageComponent, 
  ]
})

export class PageModule {}

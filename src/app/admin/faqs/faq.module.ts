import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddFaqComponent } from './components/addfaq.component';
import { ListFaqComponent } from './components/listfaq.component';
import { EditFaqComponent } from './components/editfaq.component'; 
import { ViewFaqComponent } from './components/viewfaq.component'; 
import { FaqService } from './service/faq.service';
import { FaqResolve , DetailFaqResolve, ViewFaqResolve } from './service/faq.resolve';
import { FaqRoutingModule } from './faq.routing';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    FaqRoutingModule, 
    AngularEditorModule,
  ],
  providers:[
    FaqService, 
    FaqResolve,
    DetailFaqResolve,
    ViewFaqResolve,  
  ],
  declarations:[
    ListFaqComponent,
    EditFaqComponent,
    AddFaqComponent,
    ViewFaqComponent, 
  ]
})

export class FaqModule {}

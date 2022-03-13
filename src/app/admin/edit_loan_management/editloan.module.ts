import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListEditLoanComponent } from './components/listeditloan.component';
import { EditLoanComponent } from './components/editloan.component'; 
import { ViewEditLoanComponent } from './components/vieweditloan.component'; 
import { EditLoanService } from './service/editloan.service';
import { EditLoanResolve , DetailEditLoanResolve, ViewEditLoanResolve } from './service/editloan.resolve';
import { EditLoanRoutingModule } from './editloan.routing';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule ({
  imports:[
    CommonModule,
    FormsModule,
    EditLoanRoutingModule, 
    AngularEditorModule,
  ],
  providers:[
    EditLoanService, 
    EditLoanResolve,
    DetailEditLoanResolve,
    ViewEditLoanResolve,  
  ],
  declarations:[
    ListEditLoanComponent,
    EditLoanComponent,
    ViewEditLoanComponent, 
  ]
})

export class EditLoanModule {}

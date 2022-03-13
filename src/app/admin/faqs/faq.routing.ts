import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFaqComponent } from './components/listfaq.component';
import { EditFaqComponent} from './components/editfaq.component';
import { AddFaqComponent } from './components/addfaq.component'; 
import { ViewFaqComponent } from './components/viewfaq.component';   
import { FaqResolve, DetailFaqResolve, ViewFaqResolve } from './service/faq.resolve';

const routes: Routes = [
  { path: "", component:ListFaqComponent, resolve: {faqs: FaqResolve}},
  { path:"edit/:faq_id", component: EditFaqComponent, resolve:{ faq: DetailFaqResolve} },
  { path:"add", component:AddFaqComponent}, 
  { path:"view/:faq_id", component: ViewFaqComponent, resolve:{ faq: ViewFaqResolve} },
  // { path:"contact/:faq_id", component: ViewContactComponent, resolve:{ contact: ViewContactResolve} },
];

@NgModule ({
  imports:[ RouterModule.forChild(routes)],
  exports:[ RouterModule ]
})

export class FaqRoutingModule {}

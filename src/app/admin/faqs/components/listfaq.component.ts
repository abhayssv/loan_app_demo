import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaqService } from '../service/faq.service';
import { Faq } from '../../../models/faq';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'list-faq',
  templateUrl: '../templates/listfaq.component.html'
})

export class ListFaqComponent implements OnInit {

  public faqs: Faq; 
  public indexOfClickedRow:number; 

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private faqService: FaqService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List FAQ"); 
    }

  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['faqs']; 
    if(response){
      self.faqs = response.data; 
    }
    $(function (){
      $('#lisfaqs').DataTable({
        responsive:true,
        "order": []
      });
    }); 
  } 
  
  delete1(faq_id):void{
    var allFaqs = <any>[];
    if(confirm("Do you really want to delete this faq")){
      this.faqService.deleteFaq(faq_id)
      .subscribe(response => { 
        this.toastr.success(response['message'], 'Success'); 
        if(!response['error']){
          allFaqs = this.faqs; 
            this.faqs=allFaqs.filter(h=> h.faq_id !== faq_id);
            // this.router.navigate(['/faqs']);
        }
      });
    }
  }
}


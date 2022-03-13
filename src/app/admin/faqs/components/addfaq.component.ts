import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaqService } from '../service/faq.service';
import { Faq } from '../../../models/faq';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'add-faq',
  templateUrl: '../templates/addfaq.component.html'
})

export class AddFaqComponent implements OnInit{

    public faq:Faq;

    constructor(
      private router: Router,
      private faqService: FaqService,
      private toastr: ToastrService,
      private titleService:Title
      ){ 
        this.titleService.setTitle("Add FAQ"); 
      }

    public editorConfig: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '15rem',
      placeholder: 'Enter text here...',
      translate: 'no',
      customClasses: [
        {
          name: "quote",
          class: "quote",
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: "titleText",
          class: "titleText",
          tag: "h1",
        },
      ]
    }
    
    ngOnInit(){
      this.faq = {
        faq_id:null, 
        question: '',
        answer: '', 
        message:'',
        data: this.faq,
      }
    }
    save(){ 
      this.faqService.saveFaq(this.faq)
        .subscribe(
        res => { 
            this.router.navigate(['/faqs']);
            this.toastr.success(res.message, 'Success');
        },
        
        error => {
            console.log(error);
        }
      );
    }
}

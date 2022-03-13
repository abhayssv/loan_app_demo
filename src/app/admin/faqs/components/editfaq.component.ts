import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FaqService } from '../service/faq.service';
import { Faq } from '../../../models/faq';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'edit-faq',
  templateUrl: '../templates/editfaq.component.html'
})

export class EditFaqComponent implements OnInit{

  public faq: Faq;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private faqService : FaqService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("Edit FAQ"); 
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
    let self = this;
    let response = this.route.snapshot.data['faq']; 
    if(response){ 
      self.faq= response.data; 
    }
  }
  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
  }
  save(){
    this.faqService.saveFaq(this.faq)
    .subscribe(
      res => {
        this.router.navigate(['/faqs'])
        this.toastr.success(res.message, 'Success');
       },
      error => {
        console.log(error);
      }
    );
  }
}

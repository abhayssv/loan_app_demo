import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PageService } from './../service/page.service';
import { Page } from '../../../models/page';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'edit-page',
  templateUrl: '../templates/editpage.component.html'
})

export class EditPageComponent implements OnInit{

  public page: Page;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private pageService : PageService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("Edit Pages"); 
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
    let response = this.route.snapshot.data['page']; 
    if(response){ 
      self.page= response.data;
    }
  }
  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
  }
  save(){
    this.pageService.savePage(this.page)
    .subscribe(
      res => {
        this.router.navigate(['/pages']);
        this.toastr.success(res.message, 'Success');
       },
      error => {
        console.log(error);
      }
    );
  }
}

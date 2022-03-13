import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { Faq } from '../../../models/faq';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'view-faq',
  templateUrl: '../templates/viewfaq.component.html'
})
export class ViewFaqComponent implements OnInit {

  public faq: Faq;
  constructor(
    private route: ActivatedRoute,
    private titleService:Title
    ){ 
      this.titleService.setTitle("View FAQ"); 
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

  ngOnInit() {
    this.faq = this.route.snapshot.data['faq'].data;
  }
}
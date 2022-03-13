import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { Page } from '../../../models/page';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'view-page',
  templateUrl: '../templates/viewpage.component.html'
})
export class ViewPageComponent implements OnInit {

  public page: Page;
    constructor(
      private route: ActivatedRoute,
      private titleService:Title
    ){ 
      this.titleService.setTitle("View Pages"); 
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
    this.page = this.route.snapshot.data['page'].data;
  }
}
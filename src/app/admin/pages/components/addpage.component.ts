import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../service/page.service';
import { Page } from '../../../models/page';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component ({
  selector: 'add-page',
  templateUrl: '../templates/addpage.component.html'
})

export class AddPageComponent implements OnInit{

    public page:Page;

    constructor(
      private router: Router,
      private pageService: PageService,
      private toastr: ToastrService
    ) { }

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
      this.page = {
        page_id:null,
        slug:'',
        title: '',
        description: '',
        message:'',
        error:null,
        data: this.page,
      }
    }
    save(){ 
      this.pageService.savePage(this.page)
        .subscribe(
        res => {
          var response = JSON.parse(JSON.stringify(res));
          if(response.error == false)
          {
            this.toastr.success(response.message, 'Success');
            this.router.navigate(['/pages']);
          }
          else { 
              this.router.navigate(['pages/add']);
              this.toastr.error(response.message, 'Error'); 
          }  
        },
        error => {
            console.log(error);
        }
      );
    }
}

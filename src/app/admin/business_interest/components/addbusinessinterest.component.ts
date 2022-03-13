import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessInterestService } from '../service/businessinterest.service';
import { BusinessInterest } from '../../../models/businessinterest';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
// import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component ({
  selector: 'add-business-interest',
  templateUrl: '../templates/addbusinessinterest.component.html'
})

export class AddBusinessInterestComponent implements OnInit{

    public businessinterest:BusinessInterest;

    constructor(
      private router: Router,
      private businessinterestService: BusinessInterestService,
      private toastr: ToastrService
    ) { }

    // public editorConfig: AngularEditorConfig = {
    //   editable: true,
    //   spellcheck: true,
    //   height: 'auto',
    //   minHeight: '15rem',
    //   placeholder: 'Enter text here...',
    //   translate: 'no',
    //   customClasses: [
    //     {
    //       name: "quote",
    //       class: "quote",
    //     },
    //     {
    //       name: 'redText',
    //       class: 'redText'
    //     },
    //     {
    //       name: "titleText",
    //       class: "titleText",
    //       tag: "h1",
    //     },
    //   ]
    // }
    
    ngOnInit(){
      // this.businessinterest = {
      //   id:null, 
      //   days: null,
      //   processing_fee: null, 
      //   businessinterest: null,
      //   gst: null,
      //   penalty: null,
      //   message:'',
      //   data: this.businessinterest,
      // }
    }
    save(value){  
      this.businessinterestService.saveBusinessInterest(value)
        .subscribe(
        res => {  
            this.router.navigate(['/business_persentage_calculation']);
            this.toastr.success(res.message, 'Success');
        },
        
        error => {
            console.log(error);
        }
      );
    }
}

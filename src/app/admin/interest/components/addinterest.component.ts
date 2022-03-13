import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterestService } from '../service/interest.service';
import { Interest } from '../../../models/interest';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
// import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';

@Component ({
  selector: 'add-interest',
  templateUrl: '../templates/addinterest.component.html'
})

export class AddInterestComponent implements OnInit{

    public interest:Interest;

    constructor(
      private router: Router,
      private interestService: InterestService,
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
      // this.interest = {
      //   id:null, 
      //   days: null,
      //   processing_fee: null, 
      //   interest: null,
      //   gst: null,
      //   penalty: null,
      //   message:'',
      //   data: this.interest,
      // }
    }
    save(value){ 
      
      this.interestService.saveInterest(value)
        .subscribe(
        res => {  
            this.router.navigate(['/interests']);
            this.toastr.success(res.message, 'Success');
        },
        
        error => {
            console.log(error);
        }
      );
    }
}

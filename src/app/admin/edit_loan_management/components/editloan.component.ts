import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EditLoanService } from '../service/editloan.service';
import { EditLoan } from '../../../models/editloan';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'edit-loan',
  templateUrl: '../templates/editloan.component.html'
})

export class EditLoanComponent implements OnInit{

  public editloan: EditLoan; 
  selectedId: any = [];
  per_missions: any; 
  id: any;
  loanStatus: any;
   
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private editLoanService : EditLoanService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("Edit Loan"); 
    }
 
  ngOnInit(){ 
    const loan_id = this.route.snapshot.url[1].path;
    const user_id = this.route.snapshot.url[2].path; 
    this.editLoanService.getEditLoanView(loan_id, user_id).subscribe(res=>{ 
      if(res){ 
        this.editloan = res.data; 
        this.loanStatus = res.status;  
      } 
    }) 
  }

  // getData(){
  //   this.id = this.route.snapshot.params.id; 
  //   this.editLoanService.getEditLoan(this.id).subscribe(res=>{ 
  //     if(res){ 
  //       this.editloan = res.data;   
  //     }    
  //   })  
  // } 

  save(val){   
     
    this.editLoanService.saveEditLoan(val)
      .subscribe(
      res => { 
        console.log(res);
        // this.router.navigate(['/edit_loan']);
        this.toastr.success(res.message, 'Success');
      }, 
      error => {
          console.log(error);
      }
    );
  } 
}

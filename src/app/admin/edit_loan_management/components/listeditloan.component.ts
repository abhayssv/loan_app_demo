import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditLoanService } from '../service/editloan.service';
import { EditLoan } from '../../../models/editloan';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'list-editloan',
  templateUrl: '../templates/listeditloan.component.html'
})

export class ListEditLoanComponent implements OnInit {

  public editloan: any;  
  public searchloan = { 
    "loan_id" : "", 
  };

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private editloanService: EditLoanService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Edit Loan"); 
    }

  ngOnInit(){
     
  } 
  search(value){
    console.log(value.loan_id);
    this.editloanService.getEditLoan(value.loan_id).subscribe(res=>{ 
    if(res){ this.editloan = res.data; }
      console.log("Running", this.editloan ); 
      $(function (){
        $('#listeditloan').dataTable({
          responsive:true,
          destroy: true,
          "order": []
        });
      }); 
    }) 
  } 
}


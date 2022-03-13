import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { EditLoan } from '../../../models/editloan';
import {Title} from "@angular/platform-browser"; 

@Component({
  selector: 'view-editloan',
  templateUrl: '../templates/vieweditloan.component.html'
})
export class ViewEditLoanComponent implements OnInit {

  public editloan: EditLoan; 
  permissions: any;
  constructor(
    private route: ActivatedRoute,
    private titleService:Title
    ){ 
      this.titleService.setTitle("View Edit Loan"); 
    }

  ngOnInit() {
    this.editloan = this.route.snapshot.data['editloan'].data;
    this.permissions = this.route.snapshot.data['editloan'].permission;   
  }
}
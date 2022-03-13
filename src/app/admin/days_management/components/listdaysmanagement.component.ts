import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DaysManagementService } from '../service/daysmanagement.service';
import { DaysManagement } from '../../../models/daysmanagement';
import { ToastrService } from 'ngx-toastr';  
import {Title} from "@angular/platform-browser";

declare var $: any; 

@Component({
  selector: 'list-overall-customer',
  templateUrl: '../templates/listdaysmanagement.component.html'
})

export class ListDaysManagementComponent implements OnInit {

  public daysmanagement: DaysManagement;
  public indexOfClickedRow:number; 
  status: any; 

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private daysmanagementService: DaysManagementService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Days Management"); 
    }

  
  ngOnInit(){  
    let self = this;
    let response = this.route.snapshot.data['daysmanagement'];  
    if(response){
      self.daysmanagement = response.data;  
    } 
    $(function (){
      $('#listdaysmanagement').DataTable({
        responsive:true,
        "order": []
      });
    }); 
  } 

  changeStatus(daysmanagement, key){
    let status = daysmanagement[key] ? true :false; 
    this.daysmanagementService.changeStatus(status, daysmanagement.id, key)
    .subscribe(response=>{ 
      this.toastr.success(response.message, 'Success');
    });
  } 
}


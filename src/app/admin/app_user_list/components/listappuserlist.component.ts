import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserListService } from '../service/appuserlist.service';
import { AppUserList } from '../../../models/appuserlist';
import { ToastrService } from 'ngx-toastr';  
import {Title} from "@angular/platform-browser";

declare var $: any; 

@Component({
  selector: 'list-overall-customer',
  templateUrl: '../templates/listappuserlist.component.html'
})

export class ListAppUserListComponent implements OnInit {

  public appuserlist: AppUserList;
  public indexOfClickedRow:number; 
  status: any; 

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private appuserlistService: AppUserListService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List User Type"); 
    }

  
  ngOnInit(){  
    let self = this;
    let response = this.route.snapshot.data['appuserlist'];  
    if(response){
      self.appuserlist = response.data;  
    } 
    $(function (){
      $('#listappuserlist').DataTable({
        responsive:true,
        "order": []
      });
    }); 
  } 

  changeStatus(appuserlist, key){
    let status = appuserlist[key] ? true :false; 
    this.appuserlistService.changeStatus(status, appuserlist.id, key)
    .subscribe(response=>{ 
      this.toastr.success(response.message, 'Success');
    });
  } 
}


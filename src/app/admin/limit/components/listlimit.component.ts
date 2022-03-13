import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LimitService } from '../service/limit.service';
import { userLimit } from '../../../models/userLimit';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'list-limit',
  templateUrl: '../templates/listlimit.component.html'
})

export class ListLimitComponent implements OnInit {

  public limits: userLimit; 
  public indexOfClickedRow:number; 

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private limitService: LimitService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List User Limit"); 
    }

  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['limits'];  
    if(response){
      self.limits = response.data; 
    }
    $(function (){
      $('#listlimits').DataTable({
        responsive:true,
        "order": []
      });
    }); 
  } 
  
  delete1(id):void{
    var allLimits = <any>[];
    if(confirm("Do you really want to delete this limit")){
      this.limitService.deleteLimit(id)
      .subscribe(response => { 
        this.toastr.success(response['message'], 'Success');
        if(!response['error']){
          allLimits = this.limits;
            this.limits=allLimits.filter(h=> h.id !== id);
            // this.router.navigate(['/limits']);
        }
      });
    }
  }
}


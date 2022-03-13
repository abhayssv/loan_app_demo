import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessInterestService } from '../service/businessinterest.service';
import { BusinessInterest } from '../../../models/businessinterest';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'list-businessinterest',
  templateUrl: '../templates/listbusinessinterest.component.html'
})

export class ListBusinessInterestComponent implements OnInit {

  public businessinterests: BusinessInterest; 
  public indexOfClickedRow:number; 

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private businessinterestService: BusinessInterestService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Percentage Calculation"); 
    }

  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['businessinterests']; 
    if(response){
      self.businessinterests = response.data; 
    }
    $(function (){
      $('#listbusinessinterests').DataTable({
        responsive:true,
        "order": []
      });
    }); 
  } 
  
  delete1(businessinterest_id):void{
    var allBusinessInterests = <any>[];
    if(confirm("Do you really want to delete this businessinterest")){
      this.businessinterestService.deleteBusinessInterest(businessinterest_id)
      .subscribe(response => { 
        this.toastr.success(response['message'], 'Success');
        if(!response['error']){
          allBusinessInterests = this.businessinterests;
            this.businessinterests=allBusinessInterests.filter(h=> h.businessinterest_id !== businessinterest_id);
            // this.router.navigate(['/businessinterests']);
        }
      });
    }
  }
}


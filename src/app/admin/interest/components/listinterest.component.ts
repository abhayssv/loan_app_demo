import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterestService } from '../service/interest.service';
import { Interest } from '../../../models/interest';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'list-interest',
  templateUrl: '../templates/listinterest.component.html'
})

export class ListInterestComponent implements OnInit {

  public interests: Interest; 
  public indexOfClickedRow:number; 

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private interestService: InterestService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Percentage Calculation"); 
    }

  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['interests']; 
    if(response){
      self.interests = response.data; 
    }
    $(function (){
      $('#listinterests').DataTable({
        responsive:true,
        "order": []
      });
    }); 
  } 
  
  delete1(interest_id):void{
    var allInterests = <any>[];
    if(confirm("Do you really want to delete this interest")){
      this.interestService.deleteInterest(interest_id)
      .subscribe(response => { 
        this.toastr.success(response['message'], 'Success');
        if(!response['error']){
          allInterests = this.interests;
            this.interests=allInterests.filter(h=> h.interest_id !== interest_id);
            // this.router.navigate(['/interests']);
        }
      });
    }
  }
}


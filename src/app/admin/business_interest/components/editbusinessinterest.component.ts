import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BusinessInterestService } from '../service/businessinterest.service';
import { BusinessInterest } from '../../../models/businessinterest';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'edit-businessinterest',
  templateUrl: '../templates/editbusinessinterest.component.html'
})

export class EditBusinessInterestComponent implements OnInit{

  public interests: any;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private businessinterestService : BusinessInterestService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("Edit Percentage Calculation"); 
    }

   
  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['businessinterest']; 
    if(response){  
      self.interests = response.data;  
      console.log("interests",self.interests);
      
    }
  }
  onChange(event: EventTarget) {
    // // let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    // // let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    // let files: FileList = target.files;
  }
  save(){ 
    this.businessinterestService.saveBusinessInterest(this.interests)
    .subscribe(
      res => {
        this.router.navigate(['/business_persentage_calculation'])
        this.toastr.success(res.message, 'Success');
       },
      error => {
        console.log(error);
      }
    );
  }
}

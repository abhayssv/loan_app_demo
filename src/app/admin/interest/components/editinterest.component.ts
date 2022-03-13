import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { InterestService } from '../service/interest.service';
import { Interest } from '../../../models/interest';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'edit-interest',
  templateUrl: '../templates/editinterest.component.html'
})

export class EditInterestComponent implements OnInit{

  public interests: any;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private interestService : InterestService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("Edit Percentage Calculation"); 
    }

   
  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['interest']; 
    if(response){  
      self.interests = response.data;  
    }
  }
  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
  }
  save(){ 
    this.interestService.saveInterest(this.interests)
    .subscribe(
      res => {
        this.router.navigate(['/persentage_calculation'])
        this.toastr.success(res.message, 'Success');
       },
      error => {
        console.log(error);
      }
    );
  }
}

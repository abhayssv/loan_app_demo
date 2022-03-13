import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtensionDealService } from '../service/extension.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
// import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';




@Component ({
  selector: 'add-extension-deal',
  templateUrl: '../templates/addextension.component.html'
})

export class AddExtensionDeal implements OnInit{
    
  public extension:object = {
     user_type:null,
     level:null,
     tenure : "",
     amount : "",
     status : false
   };

   userTypes: Array<any> = [{
    value: 0, label: 'Student'},
    {value: 1, label: 'Employee'},
    {value: 2, label: 'Business'},
   ];

   levels: Array<any> = [
    {value: 0, label: 'Silver'},
    {value: 1, label: 'Platinum'},
    {value: 2, label: 'Gold'},
    {value: 3, label: 'Diamond'},
   ];

   editView: boolean = false

    constructor(
      private router: Router,
      private route:ActivatedRoute,
      private extensiondealService: ExtensionDealService,
      private toastr: ToastrService
    ) { 
      if(this.router.getCurrentNavigation().extras.state){
       this.extension = this.router.getCurrentNavigation().extras.state; 
       this.editView = true
      }
    }

     ngOnInit(){
      
     }

     save(){
       this.extensiondealService.saveExtensionDeal(this.extension).subscribe(res=>{ 
          if(res) { 
            this.router.navigate(['/extension_deal']);
            this.toastr.success(res.message, 'Success'); 
          } else {
            this.toastr.error(res.message, 'Failed'); 
          }
      });
    }
}
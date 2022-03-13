import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtensionDealService } from '../service/extension.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'extension-deal',
  templateUrl: '../templates/extension.component.html',
  styleUrls: ['../css/extension.component.css']
})

export class ExtensionDealComponent implements OnInit {

  extension_deals:Array<any>= []

   userTypes: object = {
    0: 'Student',
    1: 'Employee',
    2: 'Business',
   };

   levels: object =  {
    0: 'Silver',
    1: 'Platinum',
    2: 'Gold',
    3: 'Diamond',
   };
  constructor(private extensiondealService: ExtensionDealService,
    private toastr: ToastrService){

  }

  ngOnInit() {
    this.getAllExtensionDeals();
  }

  getAllExtensionDeals(){
    this.extensiondealService.allExtensionDeal().subscribe(res=>{
      if(!res.error) {
         this.extension_deals = res.data;
      }
    })
  }

  deleteExtensionDeal(id:number) {
    this.extensiondealService.deleteExtensionDeal(id).subscribe(res=>{
      if(!res.error) {
         const index = this.extension_deals.findIndex(c=>c.id ===id)
         this.extension_deals.splice(index, 1)
         this.toastr.success(res.message, 'Success');
      } else {
        this.toastr.error(res.message, 'Failed');
      }
    })
  }

  changeStatus(id:number, status: number){
    this.extensiondealService.updateExtensionDealStatus({id, status}).subscribe(res=>{
      if(!res.error) {
         this.toastr.success(res.message, 'Success');
      } else {
        this.toastr.error(res.message, 'Failed');
        this.extension_deals.find(c=>c.id === id).status = !status;
      }
    })
  }

}



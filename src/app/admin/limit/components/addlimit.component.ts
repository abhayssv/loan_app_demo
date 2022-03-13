import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LimitService } from '../service/limit.service';
import { userLimit } from '../../../models/userLimit';  
import { ToastrService } from 'ngx-toastr';

@Component ({
  selector: 'add-limit',
  templateUrl: '../templates/addlimit.component.html'
})

export class AddLimitComponent implements OnInit{

    public limit:userLimit;

    constructor(
      private router: Router,
      private limitService: LimitService,
      private toastr: ToastrService
    ) { }
    user_types = [
      { id: 0, name: "Student" },
      { id: 1, name: "Employee" },
      { id: 2, name: "Self Employee" },
    ];
    levels = [
      { id: 0, name: "Silver" },
      { id: 1, name: "Gold" },
      { id: 2, name: "Diamond" },
      { id: 3, name: "Platinum" },
    ];

    initial_limits = [
      { id: 1, limit: "500"},
      { id: 2, limit: "1000"},
      { id: 3, limit: "1500"},
      { id: 4, limit: "2000"},
      { id: 5, limit: "2500"},
      { id: 6, limit: "3000"},
      { id: 7, limit: "3500"},
      { id: 8, limit: "4000"}
    ];

    final_limits = [
      {limit: 500},
      {limit: 1000},
      {limit: 1500},
      {limit: 2000},
      {limit: 2500},
      {limit: 3000},   
      {limit: 3500},
      {limit: 4000},
      {limit: 4500},
      {limit: 5000},
      {limit: 5500},
      {limit: 6000},
      {limit: 6500},
      {limit: 7000},
      {limit: 7500},
      {limit: 8000},
      {limit: 8500}, 
      {limit: 9000},
      {limit: 9500},
      {limit: 10000},
      {limit: 10500},
      {limit: 11000},
      {limit: 11500},
      {limit: 12000},
      {limit: 12500},
      {limit: 13000},
      {limit: 14000},
      {limit: 14500},
      {limit: 15000},
      {limit: 15500},
      {limit: 16000},
      {limit: 16500},
      {limit: 17000},
      {limit: 17500},
      {limit: 18000},
      {limit: 18500},
      {limit: 19000},
      {limit: 19500},
      {limit: 20000}, 
      {limit: 20500},
      {limit: 21000},
      {limit: 21500},
      {limit: 22000},
      {limit: 22500},
      {limit: 23000},
      {limit: 24000},
      {limit: 24500},
      {limit: 25000},
      {limit: 25500},
      {limit: 26000},
      {limit: 26500},
      {limit: 27000},
      {limit: 27500},
      {limit: 28000},
      {limit: 28500},
      {limit: 29000},
      {limit: 29500},
      {limit: 30000},
    ]
     
    ngOnInit(){
      this.limit = {
        id:null, 
        user_type: null,
        level:null,
        initial_limit: null, 
        final_limit: null, 
        message:'',
        data: this.limit,
      }
    }
    save(value){  
      this.limitService.saveLimit(value)
        .subscribe(
        res => {  
            this.router.navigate(['/app_user_limit']);
            this.toastr.success(res.message, 'Success');
        }, 
         
        error => {
            console.log(error);
        }
      );
    }
}

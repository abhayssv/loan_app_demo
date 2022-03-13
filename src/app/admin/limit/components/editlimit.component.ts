import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LimitService } from '../service/limit.service';
import { userLimit } from '../../../models/userLimit'; 
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component ({
  selector: 'edit-limit',
  templateUrl: '../templates/editlimit.component.html'
})

export class EditLimitComponent implements OnInit{

  public limits: any;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private limitService : LimitService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("Edit User Limit"); 
    }
  
  user_types = [
    { id: 1, name: "Student" },
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
    { id: 1, limit: 500},
    { id: 2, limit: 1000},
    { id: 3, limit: 1500},
    { id: 4, limit: 2000},
    { id: 5, limit: 2500},
    { id: 6, limit: 3000},
    { id: 7, limit: 3500},
    { id: 8, limit: 4000},
    { id: 9, limit: 4500},
    { id: 10, limit: 5000},
    { id: 11, limit: 5500},
    { id: 12, limit: 6000},
    { id: 13, limit: 6500},
    { id: 14, limit: 7000},
    { id: 15, limit: 7500},
    { id: 16, limit: 8000},
    { id: 17, limit: 8500},
    { id: 18, limit: 9000},
    { id: 19, limit: 9500},
    { id: 20, limit: 10000},
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
    {limit: 13500},
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
    {limit: 23500},
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
    {limit: 30500},
    {limit: 31000},
    {limit: 31500},
    {limit: 32000},
    {limit: 32500},
    {limit: 33000},
    {limit: 33500},
    {limit: 34000}, 
    {limit: 34500},
    {limit: 35000},
    {limit: 35500},
    {limit: 36000},
    {limit: 36500},
    {limit: 37000},
    {limit: 37500},
    {limit: 38000},
    {limit: 38500},
    {limit: 39000},
    {limit: 39500},
    {limit: 40000},
    {limit: 40500},
    {limit: 41000},
    {limit: 41500},
    {limit: 42000},
    {limit: 42500},
    {limit: 43000},
    {limit: 43500},
    {limit: 44000}, 
    {limit: 44500},
    {limit: 45000},
    {limit: 45500},
    {limit: 46000},
    {limit: 46500},
    {limit: 47000},
    {limit: 47500},
    {limit: 48000},
    {limit: 48500},
    {limit: 49000},
    {limit: 49500},
    {limit: 50000},
    {limit: 50500},
    {limit: 51000},
    {limit: 51500},
    {limit: 52000},
    {limit: 52500},
    {limit: 53000},
    {limit: 53500},
    {limit: 54000}, 
    {limit: 54500},
    {limit: 55000},
    {limit: 55500},
    {limit: 56000},
    {limit: 56500},
    {limit: 57000},
    {limit: 57500},
    {limit: 58000},
    {limit: 58500},
    {limit: 59000},
    {limit: 59500},
    {limit: 60000},
    {limit: 60500},
    {limit: 61000},
    {limit: 61500},
    {limit: 62000},
    {limit: 62500},
    {limit: 63000},
    {limit: 63500},
    {limit: 64000}, 
    {limit: 64500},
    {limit: 65000},
    {limit: 65500},
    {limit: 66000},
    {limit: 66500},
    {limit: 67000},
    {limit: 67500},
    {limit: 68000},
    {limit: 68500},
    {limit: 69000},
    {limit: 69500},
    {limit: 70000},
    {limit: 70500},
    {limit: 71000},
    {limit: 71500},
    {limit: 72000},
    {limit: 72500},
    {limit: 73000},
    {limit: 73500},
    {limit: 74000}, 
    {limit: 74500},
    {limit: 75000},
    {limit: 75500},
    {limit: 76000},
    {limit: 76500},
    {limit: 77000},
    {limit: 77500},
    {limit: 78000},
    {limit: 78500},
    {limit: 79000},
    {limit: 79500},
    {limit: 80000},
    {limit: 80500},
    {limit: 81000},
    {limit: 81500},
    {limit: 82000},
    {limit: 82500},
    {limit: 83000},
    {limit: 83500},
    {limit: 84000}, 
    {limit: 84500},
    {limit: 85000},
    {limit: 85500},
    {limit: 86000},
    {limit: 86500},
    {limit: 87000},
    {limit: 87500},
    {limit: 88000},
    {limit: 88500},
    {limit: 89000},
    {limit: 89500},
    {limit: 90000},
    {limit: 90500},
    {limit: 91000},
    {limit: 91500},
    {limit: 92000},
    {limit: 92500},
    {limit: 93000},
    {limit: 93500},
    {limit: 94000}, 
    {limit: 94500},
    {limit: 95000},
    {limit: 95500},
    {limit: 96000},
    {limit: 96500},
    {limit: 97000},
    {limit: 97500},
    {limit: 98000},
    {limit: 98500},
    {limit: 99000},
    {limit: 99500},
    {limit: 100000},
  ]
   
  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['limit']; 
     
    if(response){ 
      self.limits = response.data;       
    }
  }
  onChange(event: EventTarget) {
    // let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    // let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    // let files: FileList = target.files;
  }
  save(){ 
    this.limitService.saveLimit(this.limits)
    .subscribe(
      res => {
        this.router.navigate(['/app_user_limit'])
        this.toastr.success(res.message, 'Success');
       },
      error => {
        console.log(error);
      }
    );
  }
}

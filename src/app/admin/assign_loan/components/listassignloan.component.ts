import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignLoanService } from '../service/assignloan.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr'; 
import { Title} from "@angular/platform-browser"; 
import { PermissionService } from '../../permissions/service/permission.service'; 
import { Permissions } from '../../../models/permissions'; 

declare var $: any; 

@Component({
  selector: 'list-first-review',
  templateUrl: '../templates/listassignloan.component.html'
})

export class ListAssignLoanComponent implements OnInit {

  public assignloans: User;
  public indexOfClickedRow:number;
  subcategory: Permissions;
  public searchassignloan = {
    "from_date":"",
    "to_date":"",
    "loan_id" : "",
    "name" : "",
    "mobile_no" : "",
    "email" : "",
    "id_number":"",
    "user_type": "",
    "tenure":"",
    "amount":"" 
  }; 
  assignloansCopy: any;  
  firstReviewers: any;
  per_missions: any;
  dataArray = [];
  selectedId: any = [];

  isNonTrade: boolean = false
  checkAllNonTrades: boolean = false

  nontrade = [
    { label: 'a', selected: false }, 
    { label: 'b', selected: false }, 
    { label: 'c', selected: false }, 
    { label: 'd', selected: false }
  ];

  user_types = [
    { id: 0, name: "Student" },
    { id: 1, name: "Employee" },
    { id: 2, name: "Self Employee" },
  ];

  tenures = [
    { id: 1, days: 7 },
    { id: 2, days: 14 },
    { id: 3, days: 21 },
    { id: 4, days: 28 },
  ];

  amounts = [
    { id: 1, amount: 500 },
    { id: 2, amount: 1000 },
    { id: 3, amount: 1500 },
    { id: 4, amount: 2000 },
    { id: 1, amount: 2500 },
    { id: 2, amount: 3000 },
    { id: 3, amount: 3500 },
    { id: 4, amount: 4000 },
    { id: 1, amount: 4500 },
    { id: 2, amount: 5000 },
    { id: 3, amount: 6500 },
    { id: 4, amount: 7000 },
  ];
  assigners: any;
  team: any;
  

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private assignloanService: AssignLoanService,
    private permissionService : PermissionService,
    private toastr: ToastrService,
    private titleService:Title
  ){ 
    this.titleService.setTitle("List First Review"); 
  }

  
  ngOnInit(){  
    let self = this;
    let response = this.route.snapshot.data['assignloans']; 
    if(response){
      console.log(response);
      
      self.assignloans = response.data;  
      this.assigners = response.user;
      this.team = response.team;
      this.assignloansCopy = response.data;
    } 
    // this.assignloanService.getFirstReviewer().subscribe(res=>{ 
    //   if(res){ this.firstReviewers = res.data; }   
    // })
    // this.permissionService.checkPermission().subscribe(res=>{  
    //   if(res){ 
    //     this.subcategory = res.data  
    //     this.per_missions = res.permission   
    //     let stringified=JSON.stringify(this.per_missions);  
    //     JSON.parse(stringified).forEach(element => this.dataArray.push(element.per_name));  
    //   }    
    // })
     
    $(function (){
      $('#listassignloan').DataTable({
        responsive:true,
        "order": []
      });
    });  
  } 
   
  getData(role_id){ 
    this.assignloanService.getLoanByRoles(role_id)
      .subscribe(
      res => {    
        console.log(res);
        this.assignloans = res.data; 
        this.assigners = res.user;
        this.team = res.team;
      }, 
      error => {
          console.log(error);
      }
    ); 
  }

  autoAssignData(has_role){   
    this.assignloanService.autoAssignLoan(has_role, this.team)
    .subscribe(
      res => {  
        this.toastr.success(res['message'], 'Success'); 
        this.getData(this.assigners[0].has_role);
      },  
    );  
  }

  onChange(event){
    let index = this.selectedId.indexOf(parseInt(event.target.value));
    if(index == -1){
      this.selectedId.push(parseInt(event.target.value)); 
    }else{
      this.selectedId.splice(index,1)
    }   
    console.log("thissss.indexzz",index);
    console.log("thissss.index",event.target.value);
  } 

  reset(){ 
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]); 
  }

  refresh(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]); 
  } 

  save(value){    
    this.assignloanService.searchFirstReviewerLoans(value)
      .subscribe(
      res => {  
        if(res === undefined){
          this.toastr.error('Record not found.', 'Error');
        } 
        if(res){ this.assignloans = res.data; } 
      }, 
      error => {
        console.log(error);
      }
    ); 
  }

  changeTradesByCategory(event) {
    let index = this.selectedId.indexOf(parseInt(event.target.value)); 
    if(index == -1){
      this.selectedId.push(parseInt(event.target.value)); 
    }else{
      this.selectedId.splice(index,1)
    }    
  }

  allNonTrades(event) { 
    const checked = event.target.checked;
    this.assignloans.forEach(item =>{
      item.selected = checked;
      let index = this.selectedId.indexOf(parseInt(item.loan_id)); 
      if(index == -1){
        this.selectedId.push(parseInt(item.loan_id)); 
      }else{
        this.selectedId.splice(index,1)
      } 
    });   
  }

  assignLoan(value){  
    if(this.selectedId.length > 0){ 
      this.assignloanService.manualAssignLoan(value.assign_to,this.selectedId, this.team)
      .subscribe(
        res => {  
          this.toastr.success(res['message'], 'Success'); 
          this.getData(this.assigners[0].has_role); 
          setInterval(() => {
            location.reload();
          }, 3000); 
        },  
      ); 
    }else{ 
      this.toastr.error('Atleast select one loan.', 'Error');
    }
    
  }
}


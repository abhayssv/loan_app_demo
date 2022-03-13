import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OverallCollectionService } from '../service/overallcollection.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';  
import { Title } from "@angular/platform-browser";
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { PermissionService } from '../../permissions/service/permission.service'; 
import { Permissions } from '../../../models/permissions';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';


declare var $: any; 

@Component({
  selector: 'list-overall-collection',
  templateUrl: '../templates/listoverallcollection.component.html',
  providers: [DatePipe]
})

export class ListOverallCollectionComponent implements OnInit {
 
  public indexOfClickedRow:number;
  public searchoverallcollection = {
    "from_date":"",
    "to_date":"",
    "loan_id" : "",
    "name" : "",
    "mobile_no" : "",
    "email" : "",
    "id_number":"",
    "user_type": "",
    "tenure":"",
    "amount":"" ,
    "collection_team":"",
    "assigned":"",
    "overdue_days":"" 
  };

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

  /* pagination */
  p: number = 1;
  limit: number = 10;
  total: number;
  length: any;

  status: any; 
  overallCollections: any = []; 
  manageDays: any;
  users: User;
  overallCollectionsCopy: any;
  firstDate: any;
  secondDate: any;
  diffInDays: number;
  firstDates: any;
  collectionTeams: User;
  assignerLists: User;
  dataArray = [];
  subcategory: Permissions;
  per_missions: any;
  reminder:any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private datePipe: DatePipe,
    private overallCollectionService: OverallCollectionService,
    private permissionService : PermissionService,
    private toastr: ToastrService,
    private titleService:Title,
    private modalService: NgbModal,
    ){ 
      this.titleService.setTitle("List Overall Collection Customer"); 
    }

  
  ngOnInit(){  
    // let self = this;
    // let response = this.route.snapshot.data['overallcollections']; 
    // if(response){
    //   self.overallCollections = response.data; 
    //   this.overallCollectionsCopy = response.data; 
    // }

    this.getOverallCollectionsLoan(this.p);
    this.overallCollectionService.getUsers().subscribe(res=>{ 
      if(res){ this.users = res.data; }  
    }) 

    this.overallCollectionService.getCollectionTeams().subscribe(res=>{ 
      if(res){ this.collectionTeams = res.data; }  
    })
    
    this.overallCollectionService.getAssignerList().subscribe(res=>{ 
      if(res){ this.assignerLists = res.data; }  
    })
    this.permissionService.checkPermission().subscribe(res=>{  
      if(res){ 
        this.subcategory = res.data  
        this.per_missions = res.permission   
        let stringified=JSON.stringify(this.per_missions);  
        JSON.parse(stringified).forEach(element => this.dataArray.push(element.per_name));  
      }    
    })
    // $(function (){
    //   $('#listoverallcollection').DataTable({
    //     responsive:true,
    //     "scrollX": true,
    //     "order": []
    //   });
    // });
    // $(document).ready(function() { 
    //   $('#listoverallcollection').dataTable( { 
    //     // fixedColumns:   {
    //     //     rightColumns: 1,
    //     // },
    //     "scrollX": true, 
    //     "order": [] 
    //   }); 
    // }); 
  } 

  getPage(pageNo: number) {
    this.p = pageNo;
    this.getOverallCollectionsLoan(this.p);
  }

  getOverallCollectionsLoan(p: number) {
     this.getOverallCollectionsBusiness(p);
  }
  // getOverallCollectionsNonBusiness(p: number) {
  //  let offset = (p - 1) * this.limit;
  //   this.overallCollectionService.getOverallCollections(offset, this.limit).subscribe(
  //     result => { 
  //       if (result && result.data) {
  //         this.overallCollections = result.data; 
  //         this.total = result.total;
  //       } else {
  //          this.overallCollections = []
  //       }
  //     }
  //   ) 
  // }
  getOverallCollectionsBusiness(p: number) {
   let offset = (p - 1) * this.limit;
    this.overallCollectionService.getOverallCollectionsBusiness(offset, this.limit).subscribe(
      result => { 
        if (result && result.data) {
         this.overallCollections = result.data; 
         this.total = result.total; 
       } else {
           this.overallCollections = []
        }
      }
    ) 
  }

   reminderPopup(rempopup) {
    this.reminder = { choose_date: '', description: ''}
    this.modalService.open(rempopup, { backdropClass: 'dark-modal', centered: true }); 
  }

  
  saveReminder() {
    if(this.reminder.description &&  this.reminder.choose_date && this.reminder.choose_date){
      this.overallCollectionService.addReminder(this.reminder).subscribe(res=>{ 
        this.modalService.dismissAll();
        if(!res.error) { 
          this.toastr.success(res.message, 'Success'); 
        } else {
          this.toastr.error(res.message, 'Failed'); 
        }
      });
    } else {
      let message = this.reminder.choose_date ? 'Please Add Some Reminder': 'Please Add Reminder Time'
      if(!this.reminder.loan_id) {
        message = 'Please Add Loan Id';
      }

      this.toastr.error(message, 'Failed');
    }
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


  calculateDiff(data){ 
    let date = new Date(data);
    let todaysDate = new Date();
    const currentDate = moment();
    const Dates = this.datePipe.transform(date, 'yyyy-MM-dd');
    const currentDates = this.datePipe.transform(todaysDate, 'yyyy-MM-dd'); 
    this.firstDate = moment(data,"YYYY-MM-DD"); 
    this.secondDate = moment(currentDate).format("YYYY-MM-DD");
    this.diffInDays = Math.abs(this.firstDate.diff(this.secondDate, 'days'));  
    if(Dates >= currentDates){     
      return this.diffInDays == 0 ? this.diffInDays: '-'+this.diffInDays;
    }else{   
      return this.diffInDays;
    } 
  }
  
  search(value){ 
    this.overallCollectionService.searchLoan(value)
      .subscribe(
      res => { 
          if(res === undefined){
            this.toastr.error('Record not found.', 'Error');
          }
          if(res && res.data){ this.overallCollections = res.data; }
      }, 
      error => {
          console.log(error);
      }
    );
  } 

  isShow = false;
 
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
}




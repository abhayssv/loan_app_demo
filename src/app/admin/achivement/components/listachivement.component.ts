import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AchivementService } from '../service/achivement.service';
import { User } from '../../../models/user';
import { ToastrService } from 'ngx-toastr'; 
import { Title } from "@angular/platform-browser";
import { ngxCsv } from 'ngx-csv/ngx-csv';


declare var $: any; 

@Component({
  selector: 'list-reviewer-report',
  templateUrl: '../templates/listachivement.component.html'
})

export class ListAchivementComponent implements OnInit {

  public searchachivement = {
    "from_date":"",
    "to_date":"", 
    "assigned_users":"",
    "collection_team":"" 
  };
 
  length: any; 
  status: any;     
  users: any;  
  exportData: any;  
  isSearching: boolean; 
  exporting: boolean = false;
  isExport: boolean = false;
  achivement: any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private achivementService: AchivementService,
    private toastr: ToastrService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Collection Achivement"); 
    }  
 
  ngOnInit(){    
    this.achivementService.getAchivements().subscribe(res=>{ 
      if(res){  
        this.achivement = res.data;
      } 
    }) 
    $(function (){
      $('#lisachivement').DataTable({
        responsive:true,
        "order": []
      });
    }); 
  } 

  reset() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);   
  } 
 
  onChangeCollection(collection_id) {  
    if (collection_id) {
      this.achivementService.getUsers(collection_id).subscribe(
        res => {
          this.users = res.data;  
        }
      );
    } else {
      this.users = null; 
    }
  }

  search(value){  
    this.achivementService.getAchivement(value)
      .subscribe(
      res => {  
        if(res.data && res.data.length) { 
          this.achivement = res.data;
        } else {
          this.toastr.error('Record not found.', 'Error');
          this.achivement = [];
        }  
      }    
    ); 
  } 

  getAllDataToExport() {
    this.exporting = true;
    this.achivementService.getAchivements()
      .subscribe(
      res => {  
        if(res.data && res.data.length){
          this.exportData = res.data 
          this.downloadExportedData();
        } else {
          this.toastr.error('Record not found.', 'Error');
        }
        this.exporting = false;
      },  
    );
  }

  fieldReset() {
    this.searchachivement = {
      "from_date":"",
      "to_date":"", 
      "assigned_users":"",
      "collection_team":"" 
    }
  }
  
  downloadExportedData(){
    var list_tag = [];  
    this.exportData.forEach((item)=>{ 
      const appUser = item.appUser || {}
      list_tag.push({
        "loan_id": item.loan_id,
        "username": appUser.username || '',
        "mobile_no":appUser.mobile_no || '',
        "email":appUser.email || '',
        "user_type":appUser.user_type ? (appUser.user_type == 0 ? "student":"employee") : '',
        "required_amount":item.required_amount, 
        "disbursed_amount":item.disbursed_amount,
        "remaining_amount": item.remaining_amount,
        "payable_date": item.payable_date,
        "status":item.loanStatus.status,
        "reviewer_1":item.appUserReviewer_1 != null ? item.appUserReviewer_1.firstname +  item.appUserReviewer_1.lastname: "Not Assigned",
        "reviewer_2":item.appUserReviewer_2 != null ? item.appUserReviewer_2.firstname +  item.appUserReviewer_2.lastname: "Not Assigned", 
      });
    });

    const listTag = list_tag; 
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Reviewer Sheet',
      useBom: true, 
      headers: ["Loan Id", "Customer Name", "Mobile Number", "Email", "User Type", "Required Amount", "disbursed_amount", "remaining_amount","payable_date", "Status", "reviewer_1", "reviewer_2"]
    }; 
    new ngxCsv(listTag, "Reviewer Sheet", options);
    this.toastr.success('Successfully Exported.');
  }

  exportSheet(){    
    if(this.isSearching) {
      this.isExport = true;
      this.exporting = true; 
    } else {
      this.getAllDataToExport();
    }
  }
 
}


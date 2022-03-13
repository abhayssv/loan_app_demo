import { Contact } from './../../../models/contact';
import { UserService } from './../../app_users/service/user.service'; 
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import {Title} from "@angular/platform-browser";
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../templates/dashboard.component.html',
  styleUrls: ['../templates/dashboard.component.css'],
  providers:  [ UserService ]
})

export class DashboardComponent implements OnInit {
  public users: any;
  public contact:Contact;
  disbursedLoan: any =0;
  totalLoan: User;
  rejectedLoan: User;
  bannedLoan: User;
  paidLoan: any =0;
  approvedLoan: User;
  pendingLoan: any;
  token: any;
  decoded: any;
  user_type: any;
  has_role: any;
  todayRejection: any;
  todayAppliedLoan: any;
  totalDisbursedMoney: any;
  countTodayDisbursedLoan: any;
  todayDisbursedMoney: any;
  countOverallOverDueLoan: any;
  countTodayCustomerCareLoan: any = 0;
  countYesterdayCustomerCareLoan: any =0;
  countTodayOverduePaidCustomerLoan: any;
  countTodayPrePaidCustomerLoan: any;
  countYesterdayPaidCustomerCareLoan: any =0;
  countTodayPaidCustomerCareLoan: any =0;
  countOverallPaidCustomerCareLoan: any;
  countTodayFreshCustomer: any;
  countTodayReapplyCustomer: any;
  isLoading:boolean = false;
  todayExtendsLoan: any;
  totalTodayRejection: any;
  todayTotalFirstReviewAssignLoan: any;
  totalTodayApproveFirstReviewLoan: any;
  totalTodayPendingFirstReviewLoan: any;
  totalTodayRejectFirstReviewLoan: any;
  countOverallCX: any;
  countOverallS1: any;
  countOverallS2: any;
  countOverallS3: any;
  countOverallM1: any;
  countOverallM2: any;
  totalCxLoan: any;
  totalBusinessCxLoan: any;
  totalTodayBusinessCxLoan: any;
  totalTodayCxLoan: any;
  totalTodayPaidBusinessCxLoan: any;
  totalTodayPaidCxLoan: any;
  todayTodayPendingSecondReviewLoan: any;
  totalTodayPendingSecondReviewLoan: any;
  totalTodaySecondReviewDisbursedLoan: any;

  constructor( private userservice: UserService, //private contactservice: ContactService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("Vizzve Dashboard"); 
    }

  ngOnInit() {
    this.userservice.getUsersCount().subscribe(res=>{
      this.users = res.data;  
    }) 
    this.token = localStorage.bearerToken;
    this.decoded = jwt_decode(this.token); 
    this.user_type = this.decoded.user_type;
    this.has_role = this.decoded.has_role; 
    this.isLoading = true;
    this.userservice.getLoanCount().subscribe(res=>{    
      this.disbursedLoan = res.data;
      this.totalLoan = res.total;
      this.pendingLoan = res.pending;
      this.rejectedLoan = res.reject; 
      this.bannedLoan = res.banned;
      this.paidLoan = res.paid;
      this.approvedLoan = res.approved;  
      this.todayRejection = res.todayRejection;
      this.todayAppliedLoan = res.todayAppliedLoan;
      this.totalDisbursedMoney = res.getTotalSumOfMoneyDisbursed[0].total;
      this.countTodayDisbursedLoan = res.countTodayDisbursedLoan;
      this.todayDisbursedMoney = res.getTodaySumOfMoneyDisbursed[0].total;
      this.countOverallOverDueLoan = res.countOverallOverDueLoan;
      this.countTodayCustomerCareLoan = res.countTodayCustomerCareLoan;
      this.countYesterdayCustomerCareLoan = res.countYesterdayCustomerCareLoanLoan;
      this.countTodayPaidCustomerCareLoan = res.countTodayPaidCustomerCareLoan;
      this.countYesterdayPaidCustomerCareLoan = res.countYesterdayPaidCustomerCareLoanLoan;
      this.countTodayOverduePaidCustomerLoan = res.countTodayOverduePaidCustomerLoan; 
      this.countTodayPrePaidCustomerLoan = res.countTodayPrePaidCustomerLoan;
      this.countOverallPaidCustomerCareLoan = res.countOverallPaidCustomerCareLoan;
      this.countTodayFreshCustomer = res.todayFreshCustomer;
      this.countTodayReapplyCustomer = res.todayReapplyCustomer;
      this.todayExtendsLoan = res.todayExtendsLoan;
      this.totalTodayRejection = res.totalTodayRejection;
      this.todayTotalFirstReviewAssignLoan = res.todayTotalFirstReviewAssignLoan;
      this.totalTodayApproveFirstReviewLoan = res.totalTodayApproveFirstReviewLoan;
      this.totalTodayPendingFirstReviewLoan = res.totalTodayPendingFirstReviewLoan;
      this.totalTodayRejectFirstReviewLoan = res.totalTodayRejectFirstReviewLoan;
      this.countOverallCX = res.countOverallCX;
      this.countOverallS1 = res.countOverallS1;
      this.countOverallS2 = res.countOverallS2;
      this.countOverallS3 = res.countOverallS3;
      this.countOverallM1 = res.countOverallM1;
      this.countOverallM2 = res.countOverallM2; 
      this.totalCxLoan = res.totalCxLoan;
      this.totalBusinessCxLoan = res.totalBusinessCxLoan;
      this.totalTodayBusinessCxLoan = res.totalTodayBusinessCxLoan;
      this.totalTodayCxLoan = res.totalTodayCxLoan;
      this.totalTodayPaidBusinessCxLoan = res.totalTodayPaidBusinessCxLoan;
      this.totalTodayPaidCxLoan = res.totalTodayPaidCxLoan;
      this.totalTodayPendingSecondReviewLoan = res.totalTodayPendingSecondReviewLoan;
      this.totalTodaySecondReviewDisbursedLoan = res.totalTodaySecondReviewDisbursedLoan;
      this.isLoading = false;
    })
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './guard/auth.guard';
import { ProfileResolve } from './profile/service/profile.resolve';
import { LoginComponent } from './auth/components/login.component';
import { LogoutComponent } from './auth/components/logout.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { ResetPasswordComponent } from './auth/components/resetpassword.component';
import { ForgotPasswordComponent } from './auth/components/forgotpassword.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [AdminAuthGuard],
    component: LayoutComponent, resolve: { profile: ProfileResolve },
    children:[
      { path: "", component:DashboardComponent},
      { path: "profile", loadChildren: () => import(`./profile/profile.module`).then(m => m.ProfileModule) },
      { path: "users", loadChildren: () => import(`./users/user.module`).then(m => m.UserModule) },  
      { path: "app_users", loadChildren: () => import(`./app_users/user.module`).then(m => m.UserModule)},
      { path: "email_setting", loadChildren: () => import(`./email_settings/emailsetting.module`).then(m => m.EmailSettingModule )},
      // { path: "contact", loadChildren: () => import(`./contact/contact.module`).then(m => m.ContactModule)},
      { path: "pages", loadChildren: () => import(`./pages/page.module`).then(m => m.PageModule)},
      { path: "faqs", loadChildren: () => import(`./faqs/faq.module`).then(m => m.FaqModule)},
      { path: "push_notification", loadChildren: () => import(`./push_notification/pushnotification.module`).then(m => m.PushNotificationModule)},
      { path: "settings", loadChildren: () => import(`./settings/settings.module`).then(m => m.SettingsModule)},
      { path: "extension_deal", loadChildren: () => import(`./extension_deal/extension.module`).then(m => m.ExtensionDealModule)},
      { path: "persentage_calculation", loadChildren: () => import(`./interest/interest.module`).then(m => m.InterestModule)},
      { path: "business_persentage_calculation", loadChildren: () => import(`./business_interest/businessinterest.module`).then(m => m.BusinessInterestModule)},
      { path: "app_user_limit", loadChildren: () => import(`./limit/limit.module`).then(m => m.LimitModule)},
      { path: "category", loadChildren: () => import(`./category/category.module`).then(m => m.CategoryModule)},
      { path: "sub_category", loadChildren: () => import(`./sub_category/subcategory.module`).then(m => m.SubCategoryModule)},
      { path: "permissions", loadChildren: () => import(`./permissions/permission.module`).then(m => m.PermissionModule)}, 
      { path: "customer_details", loadChildren: () => import(`./customer_details/customer.module`).then(m => m.CustomerModule)}, 
      { path: "first_review", loadChildren: () => import(`./first_review/firstreview.module`).then(m => m.FirstreviewModule)},
      { path: "second_review", loadChildren: () => import(`./second_review/secondreview.module`).then(m => m.SecondreviewModule)},
      { path: "overall_customer_loan", loadChildren: () => import(`./overall_loan/overallcustomer.module`).then(m => m.OverallCustomerModule)},
      { path: "approval_report", loadChildren: () => import(`./approval_report/approvalreport.module`).then(m => m.ApprovalReportModule)},
      { path: "repayment_details", loadChildren: () => import(`./repayment_details/repaymentdetail.module`).then(m => m.RepaymentDetailModule)},
      { path: "business_repayment_details", loadChildren: () => import(`./business_repayment_details/businessrepaymentdetail.module`).then(m => m.BusinessRepaymentDetailModule)},
      { path: "cash_flatting", loadChildren: () => import(`./cash_flatting/cashflatting.module`).then(m => m.CashFlattingModule)},
      { path: "business_cash_flatting", loadChildren: () => import(`./business_cash_flatting/cashflatting.module`).then(m => m.BusinessCashFlattingModule)},
      { path: "overall_collection_customer", loadChildren: () => import(`./overall_collection/overallcollection.module`).then(m => m.OverallCollectionModule)},
      { path: "overall_business_collection_customer", loadChildren: () => import(`./business_overall_collection/overallcollection.module`).then(m => m.BusinessOverallCollectionModule)},                        
      { path: "app_user_list", loadChildren: () => import(`./app_user_list/appuserlist.module`).then(m => m.AppUserListModule)},            
      { path: "case_review", loadChildren: () => import(`./case_review/casereview.module`).then(m => m.CaseReviewModule)},
      { path: "reviewer_report", loadChildren: () => import(`./reviewer_report/reviewerreport.module`).then(m => m.ReviewerReportModule)},
      { path: "collection_report", loadChildren: () => import(`./collection_report/collectionreport.module`).then(m => m.CollectionReportModule)},
      { path: "days_management", loadChildren: () => import(`./days_management/daysmanagement.module`).then(m => m.DaysManagementModule)},
      { path: "location_restriction", loadChildren: () => import(`./location_restriction/locationrestriction.module`).then(m => m.LocationRestrictionModule)},
      { path: "assign_loan", loadChildren: () => import(`./assign_loan/assignloan.module`).then(m => m.AssignLoanModule)},
      { path: "edit_loan", loadChildren: () => import(`./edit_loan_management/editloan.module`).then(m => m.EditLoanModule)},
      { path: "collection_team_management", loadChildren: () => import(`./collection_team_management/collectionteammanagement.module`).then(m => m.CollectionTeamManagementModule)},
      { path: "collection_achivement", loadChildren: () => import(`./achivement/achivement.module`).then(m => m.AchivementModule)},
      { path: "approver_achivement", loadChildren: () => import(`./approver_achivement/approverachivement.module`).then(m => m.ApproverAchivementModule)}
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "forgot_password", component: ForgotPasswordComponent },
  { path: "reset_password", component: ResetPasswordComponent },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

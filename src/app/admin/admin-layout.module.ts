import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AdminAuthGuard } from './guard/auth.guard'
import { ChangeProfileService } from '../shared/change-profile.service';
import { AdminAuthService } from './auth/service/adminauth.service';
import { AlertModule } from './_alert';
import { UserVideoModule } from './user_video/uservideo.module';
import { RePaymentHistoryModule } from './repayment_history/repayment_history.module';
import { SlugifyPipe } from '../shared/slugify.pipe';
import { AdminRoutingModule } from "./admin-routing.module";
import { TokenInterceptor } from "../default.interceptors";
import { ProfileResolve } from './profile/service/profile.resolve';
import { ProfileService } from './profile/service/profile.service';
import { LoginComponent } from './auth/components/login.component';
import { LogoutComponent } from './auth/components/logout.component';
import { ResetPasswordComponent } from './auth/components/resetpassword.component';
import { ForgotPasswordComponent } from './auth/components/forgotpassword.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header.component';
import { ReminderComponent } from './layout/reminder.component';
import { MenuComponent } from './layout/menu.component';
import { FooterComponent } from './layout/footer.component';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { PermissionService } from './permissions/service/permission.service';
import { UservideoService } from './user_video/uservideo.service';
import { CommonService } from '../shared/common.service';

@NgModule({
  declarations: [
    SlugifyPipe,
    LoginComponent,
    LogoutComponent,
    LayoutComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    DashboardComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ReminderComponent
  ],
  providers:[
    SlugifyPipe,
    AdminAuthGuard,
    ChangeProfileService,
    ProfileResolve,
    ProfileService,
    AdminAuthService,
    PermissionService,
    UservideoService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi : true},
    CommonService
  ],
  imports: [
    CommonModule,
    AlertModule,
    UserVideoModule,
    RePaymentHistoryModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminLayoutModule { }

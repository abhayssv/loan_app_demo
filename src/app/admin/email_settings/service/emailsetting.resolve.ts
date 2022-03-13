import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EmailSettingService } from './emailsetting.service'; 
 
@Injectable()
export class EmailSettingResolve implements Resolve<any>{

  constructor(private emailSettingService: EmailSettingService){}

  resolve() { 
    return this.emailSettingService.getEmailSettings();
  }
} 

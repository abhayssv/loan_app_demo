import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SettingsService } from './settings.service'; 
 
@Injectable()
export class SettingsResolve implements Resolve<any>{

  constructor(private settingsService: SettingsService){
    
  }

  resolve() { 
     return this.settingsService.getSettings();
  }
} 

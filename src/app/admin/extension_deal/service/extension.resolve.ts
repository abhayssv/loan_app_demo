import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ExtensionDealService } from './extension.service'; 
 
@Injectable()
export class ExtensionDealResolve implements Resolve<any>{

  constructor(private extensionDealService: ExtensionDealService){}

  resolve() { 
    
  }
} 

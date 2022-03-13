import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EditLoanService } from './editloan.service';
// import { ContactService } from '../../contact/service/contact.service';


@Injectable()
export class EditLoanResolve implements Resolve<any>{

  constructor(private editloanService: EditLoanService){}
  resolve(){
    return this.editloanService.getsEditLoan();
  }
}

@Injectable()
export class DetailEditLoanResolve implements Resolve<any>{

  constructor(private editloanService: EditLoanService){}

  resolve(route: ActivatedRouteSnapshot){
    // return this.editloanService.getEditLoan(route.paramMap.get('id'));
  }
} 

@Injectable()
export class ViewEditLoanResolve implements Resolve<any>{

  constructor(private editloanService: EditLoanService){}

  resolve(route: ActivatedRouteSnapshot){
    // return this.editloanService.getEditLoanView(route.paramMap.get('id'));
  }
}  
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FaqService } from './faq.service';
// import { ContactService } from '../../contact/service/contact.service';


@Injectable()
export class FaqResolve implements Resolve<any>{

  constructor(private faqService: FaqService){}
  resolve(){
    return this.faqService.getFaqs();
  }
}

@Injectable()
export class DetailFaqResolve implements Resolve<any>{

  constructor(private faqService: FaqService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.faqService.getFaq(route.paramMap.get('faq_id'));
  }
} 

@Injectable()
export class ViewFaqResolve implements Resolve<any>{

  constructor(private faqService: FaqService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.faqService.getFaqView(route.paramMap.get('faq_id'));
  }
} 

// @Injectable()
// export class ViewContactResolve implements Resolve<any>{

//   constructor(private contactService: ContactService){}

//   resolve(route: ActivatedRouteSnapshot){
//     return this.contactService.getContact(route.paramMap.get('faq_id'));
//   }
// } 

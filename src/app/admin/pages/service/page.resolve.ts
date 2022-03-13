import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { PageService } from './page.service';
// import { ContactService } from '../../contact/service/contact.service';


@Injectable()
export class PageResolve implements Resolve<any>{

  constructor(private pageService: PageService){}
  resolve(){
    return this.pageService.getPages();
  }
}

@Injectable()
export class DetailPageResolve implements Resolve<any>{

  constructor(private pageService: PageService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.pageService.getPage(route.paramMap.get('page_id'));
  }
} 

@Injectable()
export class ViewPageResolve implements Resolve<any>{

  constructor(private pageService: PageService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.pageService.getPageView(route.paramMap.get('page_id'));
  }
} 

// @Injectable()
// export class ViewContactResolve implements Resolve<any>{

//   constructor(private contactService: ContactService){}

//   resolve(route: ActivatedRouteSnapshot){
//     return this.contactService.getContact(route.paramMap.get('page_id'));
//   }
// } 

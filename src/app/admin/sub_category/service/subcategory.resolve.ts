import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SubCategoryService } from './subcategory.service';
// import { ContactService } from '../../contact/service/contact.service';


@Injectable()
export class SubCategoryResolve implements Resolve<any>{

  constructor(private subcategoryService: SubCategoryService){}
  resolve(){
    return this.subcategoryService.getsSubCategory();
  }
}

@Injectable()
export class DetailSubCategoryResolve implements Resolve<any>{

  constructor(private subcategoryService: SubCategoryService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.subcategoryService.getSubCategory(route.paramMap.get('id'));
  }
} 

@Injectable()
export class ViewSubCategoryResolve implements Resolve<any>{

  constructor(private subcategoryService: SubCategoryService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.subcategoryService.getSubCategoryView(route.paramMap.get('id'));
  }
}  
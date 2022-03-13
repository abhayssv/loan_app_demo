import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CategoryService } from './category.service';
// import { ContactService } from '../../contact/service/contact.service';


@Injectable()
export class CategoryResolve implements Resolve<any>{

  constructor(private categoryService: CategoryService){}
  resolve(){
    return this.categoryService.getsCategory();
  }
}

@Injectable()
export class DetailCategoryResolve implements Resolve<any>{

  constructor(private categoryService: CategoryService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.categoryService.getCategory(route.paramMap.get('id'));
  }
} 

@Injectable()
export class ViewCategoryResolve implements Resolve<any>{

  constructor(private categoryService: CategoryService){}

  resolve(route: ActivatedRouteSnapshot){
    return this.categoryService.getCategoryView(route.paramMap.get('id'));
  }
}  
import { Component, OnInit } from '@angular/core'; 
import { PermissionService } from '../permissions/service/permission.service';
import { Router } from '@angular/router';
import { Permissions } from '../../models/permissions'; 

@Component({
  selector: 'admin-menu',
  templateUrl: 'menu.component.html',
})
export class MenuComponent implements OnInit {
  per_missions: any;
  subcategory: Permissions;
  dataArray = [];
  userModule: string[];
  constructor(
    private permissionService : PermissionService,
    private router:Router
  ) { }
    
  ngOnInit() {   
    // this.router.url;
    // this.userModule = [
    //   "/users", "/category", "/sub_category", "/permissions"
    // ];
    // setInterval(()=>{  
      this.permissionService.checkPermission().subscribe(res=>{ 
        if(res){ 
          this.subcategory = res.data 
          this.per_missions = res.permission   
          let stringified=JSON.stringify(this.per_missions); 
          JSON.parse(stringified).forEach(element => this.dataArray.push(element.per_name));
        }    
      })
    // }, 3000);   
  }  
  
  openSubMenu(elementObj){ 
    const className = document.getElementsByClassName('with-sub'); 
    for (let index = 0; index < className.length; index++) { 
      if(className[index].id === elementObj.id){ 
          if(className[index].classList.contains('opened')){
            className[index].classList.remove('opened'); 
          }else{
            className[index].classList.add('opened') 
          }
      }else{
        className[index].classList.remove('opened');
      } 
    } 
  }
  
  // ngOnDestroy(){
  //   alert('Unmount');
    
  // }
}

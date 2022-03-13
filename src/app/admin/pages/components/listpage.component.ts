import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../service/page.service';
import { Page } from '../../../models/page';
import { Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'list-page',
  templateUrl: '../templates/listpage.component.html'
})

export class ListPageComponent implements OnInit {

  public pages: Page;
  public indexOfClickedRow:number;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private pageService: PageService,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List Pages"); 
    }

  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['pages'];
    if(response){
      self.pages = response.data; 
    }
    $(function (){
      $('#lispages').DataTable({
        responsive:true,
        "order": []
      });
    }); 
  } 
  
  delete1(page_id):void{
    var allPages = <any>[];
    if(confirm("Do you really want to delete this page")){
      this.pageService.deletePage(page_id)
      .subscribe(response => {
        if(!response['error']){
          allPages = this.pages;
            this.pages=allPages.filter(h=> h.page_id !== page_id);
            // this.router.navigate(['/pages']);
        }
      });
    }
  }
}


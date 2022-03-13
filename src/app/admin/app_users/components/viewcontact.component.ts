import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Contact } from '../../../models/contact';
import {Title} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'view-contact',
  templateUrl: '../templates/viewcontact.component.html'
})
export class ViewContactComponent implements OnInit {

  public contact: Contact;

  constructor(
  private route: ActivatedRoute, 
  private titleService:Title
  ){ 
    this.titleService.setTitle("View Customer Contact"); 
  }
  ngOnInit() {
    this.contact = this.route.snapshot.data['contact'].data; 
    $(function (){
      $('#liscontacts').DataTable({
        responsive:true,
        "order": []
      });
    });
  } 
}
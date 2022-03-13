import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../service/contact.service';
import { Contact } from '../../../models/contact';

declare var $: any;

@Component({
  selector: 'list-contact',
  templateUrl: '../templates/listcontact.component.html'
})

export class ListContactComponent implements OnInit {

  public contacts: Contact;
  public indexOfClickedRow:number;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private contactService: ContactService
  ){ }

  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data.contact;
    if(response){
      self.contacts = response.data; 
    }
    $(function (){
      $('#liscontacts').DataTable({
        responsive:true,
        "order": []
      });
    });
  }

  changeStatus(contact, key){
    let status = contact[key] ? true :false;
    this.contactService.changeStatus(status, contact.id, key)
    .subscribe(response=>{ 
    });
  }

  deleteContact(id):void{
    var allContacts = <any>[];
    if(confirm("Do you really want to delete this contact")){
      this.contactService.deleteContact(id)
      .subscribe(response => {
        if(!response['error']){
          allContacts = this.contacts;
            this.contacts=allContacts.filter(h=> h.id !==id);
            this.router.navigate(['/contacts']);
        }
      });
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Contact } from '../../../models/contact';

@Component({
  selector: 'view-contact',
  templateUrl: '../templates/viewcontact.component.html'
})
export class ViewContactComponent implements OnInit {

  public contact: Contact;
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.contact = this.route.snapshot.data['contact'].data.length; 
  }
}
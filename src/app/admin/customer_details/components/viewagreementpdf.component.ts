import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { User } from '../../../models/user'; 
import { Title } from "@angular/platform-browser"; 
import { jsPDF } from "jspdf";

@Component({
  selector: 'view-agreement',
  templateUrl: '../templates/viewagreementpdf.component.html'
})
export class ViewAgreementPdfComponent implements OnInit {

  @ViewChild('agreementContent', {static:false}) el !: ElementRef;

  public customer: User; 
  
  constructor( 
    private route: ActivatedRoute, 
    private titleService:Title
  ) { 
      this.titleService.setTitle("View Customer Detail"); 
    }
  ngOnInit() { 
    this.customer = this.route.snapshot.data['customer'].data; 
  } 
  makePDF(){
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement,{
      callback: (pdf)=>{
        pdf.save("customer-agreement.pdf");
      }
    })
  }  
}
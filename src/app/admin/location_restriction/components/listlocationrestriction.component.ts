import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationRestrictionService } from '../service/locationrestriction.service';
import { userLocationRestriction } from '../../../models/userLocationRestriction';
import { ToastrService } from 'ngx-toastr';
import {Title} from "@angular/platform-browser";
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';


declare var $: any;


@Component({
  selector: 'list-location-restriction',
  templateUrl: '../templates/listlocationrestriction.component.html'
})

export class ListLocationRestrictionComponent implements OnInit {

  public locationrestrictions: userLocationRestriction; 
  public indexOfClickedRow:number; 
  stateLists: any;
  public loc_restriction = {
    "state" : "",
    "city" : "",  
  };
  cityLists: any;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private locationrestrictionService: LocationRestrictionService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private titleService:Title
    ){ 
      this.titleService.setTitle("List User Location Restriction"); 
    }

  ngOnInit(){
    let self = this;
    let response = this.route.snapshot.data['locationrestrictions'];  
    if(response){
      self.locationrestrictions = response.data; 
      console.log("11111111",self.locationrestrictions);
      
    }
    this.locationrestrictionService.getStateList().subscribe(res=>{ 
      if(res){ this.stateLists = res.data; } 
    })
    $(function (){
      $('#listlocationrestrictions').DataTable({
        responsive:true,
        "order": []
      });
    }); 
  } 

  flatPop(fpopup, data) { 
    this.modalService.open(fpopup, { backdropClass: 'dark-modal', centered: true });  
  }

  onChangeCity(state_id) {  
    const stateId = state_id.replace(/\:.*/,'');  
    if (state_id) { 
      this.locationrestrictionService.getCityList(stateId).subscribe(
        res => {
          this.cityLists = res.data;  
        }
      );
    } else {
      this.cityLists = null; 
    }
  }

  saveLocRestriction(value){    
    const state = value.state.replace(/\:.*/,'');  
    const city = value.city;
    const formData = {
      state:state, city:city
    } 
    this.locationrestrictionService.saveLocationRestriction(formData)
      .subscribe(
      res => { 
        console.log(res['status_code']);
        if(res['status_code'] == 202){
          this.toastr.error(res['message'], 'Error');
        }else{
          this.toastr.success(res['message'], 'Success');
          setInterval(() => {
            window.location.reload(); 
          }, 3000);
        } 
      },
      error => {
          console.log(error);
      }
    );
  }
  
  delete1(id):void{
    var allLocationRestrictions = <any>[];
    if(confirm("Do you really want to delete this locationrestriction")){
      this.locationrestrictionService.deleteLocationRestriction(id)
      .subscribe(response => { 
        this.toastr.success(response['message'], 'Success');
        if(!response['error']){
          allLocationRestrictions = this.locationrestrictions;
            this.locationrestrictions=allLocationRestrictions.filter(h=> h.id !== id);
            // this.router.navigate(['/locationrestrictions']);
        }
      });
    }
  }
}


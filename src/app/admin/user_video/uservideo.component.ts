import { Output, EventEmitter,Component, OnInit, OnDestroy, Input, ViewChild, SimpleChanges, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { UservideoService } from './uservideo.service';

@Component({ 
  selector: 'user-video', 
  templateUrl: 'uservideo.component.html' 
})
export class UservideoComponent implements OnInit, OnDestroy {
  @Input() userId: Number;
  videoSrcs:Array<any>;

  constructor(private uservideoService: UservideoService) { }

  ngOnInit() {
  }

  ngOnDestroy(){

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.userId && changes.userId.currentValue){
      this.getVideo(Number(changes.userId.currentValue));    
    }
  }

  getVideo(userId){
    this.uservideoService.getVideoByUserId(userId).subscribe(res=>{
      console.log(res)
      if(!res.error){
       this.videoSrcs = [].concat(res.data)
      }
    })
  }
}
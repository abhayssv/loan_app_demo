import { ViewEncapsulation, Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
declare var $:any;
import { CommonService } from '../../shared/common.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
    
  @ViewChild('rempopup',  {static: true}) popup: ElementRef;
  reminderData: any;
  currentReminder: Array<any>= [];
  periodicCheck:any;
  remindMeLaterIds:object={};
  constructor(private router: Router, 
              private commonService: CommonService,  
              private modalService: NgbModal,
              private toastr: ToastrService) {
      this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
         this.reminderCheck();
      }
    });
  }

  ngOnInit() {
  }

  reminderPopup() {
    this.modalService.open(this.popup, { backdropClass: 'dark-modal', centered: true }); 
  }

  reminderCheck() {
    clearInterval(this.periodicCheck);
    this.periodicCheck = setInterval(()=>{
      const d = new Date();
      this.setReminderLater();
      if (d.getSeconds() === 0 || d.getSeconds() === 30) {
        this.getLatestReminder()      
      }
    },1000);
   
  }

  setReminderLater(){
   Object.keys(this.remindMeLaterIds).map(id=>{
      if (this.remindMeLaterIds[id] > 0) {
        this.remindMeLaterIds[id] -= 1000;
      }
    });
  }

  getLatestReminder() {
    this.commonService.getReminderNotification().subscribe(res=>{
       if (res && !res.error) {
        this.reminderData = res.data.map(each=>{
          each.remindMeLater = this.remindMeLaterIds[each.id] || 0;
          return each;
        });

        this.showReminderPopup();
       }
    });
  }

  showReminderPopup() {
     this.currentReminder = [];
        this.reminderData.map(each=> {
            const d = each.choose_date || new Date()
            const date_time = Date.parse(d)
            const currentTime = Date.now();
            const timeDiff = (date_time - currentTime)/(1000*60);

            if ((timeDiff < 15 && !each.remindMeLater) || timeDiff === 0) {
              this.currentReminder.push(each);
              this.reminderPopup();
            }
     });
  }

  remindMeLater(id) {
   this.remindMeLaterIds[id] = 10*60*1000;
   this.modalService.dismissAll(); 
  }

  done(id){
    this.commonService.doneReminder(id).subscribe(res=>{
       if(!res.error) { 
          this.toastr.success(res.message, 'Success'); 
        } else {
          this.toastr.error(res.message, 'Failed'); 
        }
        this.closeReminder();
    });
  }

  closeReminder() {
    this.modalService.dismissAll(); 
  }

  ngOnDestroy(){
    clearInterval(this.periodicCheck);
  }

  ngAfterViewInit(){
  
    // Collapse box
    $('.box-typical-dashboard').each(function(){
      var parent = $(this),
        btnCollapse = parent.find('.action-btn-collapse');

      btnCollapse.click(function(){
        if (parent.hasClass('box-typical-collapsed')) {
          parent.removeClass('box-typical-collapsed');
        } else {
          parent.addClass('box-typical-collapsed');
        }
      });
    });

    // Full screen box
    $('.box-typical-dashboard').each(function(){
      var parent = $(this),
        btnExpand = parent.find('.action-btn-expand'),
        classExpand = 'box-typical-full-screen';

      btnExpand.click(function(){
        if (parent.hasClass(classExpand)) {
          parent.removeClass(classExpand);
          $('html').css('overflow','auto');
        } else {
          parent.addClass(classExpand);
          $('html').css('overflow','hidden');
        }
        dashboardBoxHeight();
      });
    });

    // Calculate height
    function dashboardBoxHeight() {
      $('.box-typical-dashboard').each(function(){
        var parent = $(this),
          header = parent.find('.box-typical-header'),
          body = parent.find('.box-typical-body');
        body.height(parent.outerHeight() - header.outerHeight());
      });
    }

    dashboardBoxHeight();

    $(window).resize(function(){
      dashboardBoxHeight();
    });

    // Left mobile menu
    $('.hamburger').click(function(){
      if ($('body').hasClass('menu-left-opened')) {
        $(this).removeClass('is-active');
        $('body').removeClass('menu-left-opened');
        $('html').css('overflow','auto');
      } else {
        $(this).addClass('is-active');
        $('body').addClass('menu-left-opened');
        $('html').css('overflow','hidden');
      }
    });

    $('.mobile-menu-left-overlay').click(function(){
      $('.hamburger').removeClass('is-active');
      $('body').removeClass('menu-left-opened');
      $('html').css('overflow','auto');
    });

    // Right mobile menu
    $('.site-header .burger-right').click(function(){
      if ($('body').hasClass('menu-right-opened')) {
        $('body').removeClass('menu-right-opened');
        $('html').css('overflow','auto');
      } else {
        $('.hamburger').removeClass('is-active');
        $('body').removeClass('menu-left-opened');
        $('body').addClass('menu-right-opened');
        $('html').css('overflow','hidden');
      }
    });

    $('.mobile-menu-right-overlay').click(function(){
      $('body').removeClass('menu-right-opened');
      $('html').css('overflow','auto');
    });

    $.browser = {};
	$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
	$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
	$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());

	if ($.browser.chrome) {
		$('body').addClass('chrome-browser');
	} else if ($.browser.msie) {
		$('body').addClass('msie-browser');
	} else if ($.browser.mozilla) {
		$('body').addClass('mozilla-browser');
	}

	$('#show-hide-sidebar-toggle').on('click', function() {
		if (!$('body').hasClass('sidebar-hidden')) {
			$('body').addClass('sidebar-hidden');
		} else {
			$('body').removeClass('sidebar-hidden');
		}
  });

  $('.side-menu-list li.with-sub').each(function(){
		var parent = $(this),
			clickLink = parent.find('>span'),
			subMenu = parent.find('>ul');

		clickLink.click(function() {
			if (parent.hasClass('opened')) {
				parent.removeClass('opened');
				subMenu.slideUp();
				subMenu.find('.opened').removeClass('opened');
			} else {
				if (clickLink.parents('.with-sub').length == 1) {
					$('.side-menu-list .opened').removeClass('opened').find('ul').slideUp();
				}
				parent.addClass('opened');
				subMenu.slideDown();
			}
		});
	});
  
  }
}

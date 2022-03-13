import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[reminder]',
  templateUrl: './reminder.component.html',
})
export class ReminderComponent implements OnInit {
  @Input() currentReminder: Array<any>;
  @Output() close:EventEmitter<any> = new EventEmitter();
  @Output() remindMeLater:EventEmitter<any> = new EventEmitter();
  @Output() done:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closePopup() {
    this.close.emit();
  }
}

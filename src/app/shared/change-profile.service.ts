import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core'
@Injectable()
export class ChangeProfileService {
  @Output() profile: EventEmitter<any> = new EventEmitter();
  constructor() {
  }
  change(profile) {
    this.profile.emit(profile.data);
  }
  getEmittedValue() {
    return this.profile;
  }
}
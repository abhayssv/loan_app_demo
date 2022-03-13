import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private questionSource = new BehaviorSubject(0);
  currentQuestionId = this.questionSource.asObservable();

  constructor() { }

  changeQuestionId(question_id: any) {
    this.questionSource.next(question_id)
  }

}
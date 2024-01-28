import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingDataService {
  counter = 1;
  count: BehaviorSubject<number>;

  fave: BehaviorSubject<any>;
  trigerNotficationsInHeader: BehaviorSubject<any>;
// share static data (not subject or begaviorSubject)
  public storage: any;

  constructor() {
    this.count = new BehaviorSubject(this.counter);
    this.fave = new BehaviorSubject(this.counter);
    this.trigerNotficationsInHeader = new BehaviorSubject('');
  }

  nextCount(data: any) {
    this.count.next(data);
  }

  nextFave(data: any) {
    this.fave.next(data);
  }

  trigerNotfications(data: any) {
    this.trigerNotficationsInHeader.next(data);
  }

}

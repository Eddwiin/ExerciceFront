import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBadgeNotifService {

  nbItemsSubject = new BehaviorSubject<number>(0);
  nbItems$ = this.nbItemsSubject.asObservable();

  constructor() { }

  updateItem(number: number) {
    this.nbItemsSubject.next(this.nbItemsSubject.getValue() + number);
  }
}

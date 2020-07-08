import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBadgeNotifService {

  nbItemsSubject = new BehaviorSubject<number>(0);
  nbItems$ = this.nbItemsSubject.asObservable();

  constructor() { }

  addItem = (nb: number = 1) => this.nbItemsSubject.next(this.nbItemsSubject.getValue() + nb);
  removeItem = (nb: number = 1) => this.nbItemsSubject.next(this.nbItemsSubject.getValue() - nb);
  clearBadge = () => this.nbItemsSubject.next(0);

}
